<template>
  <ap-modal ref="transferenciaModal" title="Nova Transferência" :visible="isModalOpened" @hide="closeModal"
            :searchable="hasSearch" @search-input="listBySearch" @search-close="closeSearch"
  >
    <q-carousel slot="content" height="100%" no-swipe ref="stepperTransferencia" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER NEGOCIO DESTINO-->
      <q-carousel-slide class="q-pa-none" style="width:400px; height: 300px">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informar o negócio de destino</span>
        </div>

        <div class="q-px-lg q-py-sm" style="text-align: center">
          <q-list v-if="negociosDestino.length > 0" no-border inset-separator link>
            <q-item v-for="negocioDestino in negociosDestino" @click.native="selectNegocioDestino(negocioDestino.id)">

              <q-item-side icon="check_circle" color="positive"
                           v-if="transferencia.negocioCulturaDestinoId === negocioDestino.id"
              />

              <q-item-main inset>

                <q-item-tile>
                  {{negocioDestino.nome}} {{negocioDestino.safra}}
                </q-item-tile>

                <q-item-tile sublabel v-if="negocioDestino.numero_pedido">
                  Pedido {{negocioDestino.numero_pedido}}
                </q-item-tile>

                <q-item-tile sublabel v-if="negocioDestino.tipoNegocio.is_quantidade">
                  Contrato {{negocioDestino.numero_contrato}}
                </q-item-tile>

                <q-item-tile sublabel v-if="!negocioDestino.tipoNegocio.is_quantidade">
                  {{negocioDestino.numero_contrato}}
                </q-item-tile>

                <q-item-tile sublabel>
                  <span>
                    Entregue {{numeral(negocioDestino.quantidade_entregue).format('0,0')}}
                  </span>
                  <span v-if="negocioDestino.quantidade">
                    de {{numeral(negocioDestino.quantidade).format('0,0')}}
                  </span>
                  {{negocioDestino.unidadeMedida.sigla}}
                </q-item-tile>

                <q-item-tile></q-item-tile>
              </q-item-main>

              <q-item-side v-if="negocioDestino.prazo_entrega_final">
                <q-item-tile stamp>
                  {{moment(negocioDestino.prazo_entrega_final).format('ll')}}
                </q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </div>
      </q-carousel-slide>

      <!--PASSO 2 INFORMAR A QUANTIDADE DE TRANSFERENCIA-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe a Quantidade</span>
        </div>
        <div class="q-px-lg q-py-sm" style="text-align: center">
          Campos
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep !== 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 2"/>
        <!--<q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 4" :disable=""/>-->
        <q-btn @click="saveTransferencia" flat label="Salvar" color="primary"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import NegocioService from "assets/js/service/negocio/NegocioService";
  import agroUtils from "assets/js/AgroUtils";
  import apModal from 'components/ApModal'
  import apImage from 'components/ApImage'
  export default {
    name: "transferencia-modal",
    components: {
      apModal,
      apImage,
    },
    watch:{
    },
    data(){
      return {
        negocioService: new NegocioService(),
        searchValueByStep: null,
        isModalOpened: false,
        negociosDestino: [],
        hasSearch: true,
        currentStep: 0,
        negocio: null,
        filter: {
          type: 'non-trashed',
          search: 'all',
        },
        transferencia: {
          quantidade: null,
          negocioCulturaOrigemId: null,
          negocioCulturaDestinoId: null,
        }
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          var filter = {type: 'all', search:(val.search.length > 2 ? val.search : '')};
          this.listNegocios(filter)
        },
        deep: true,
      }
    },
    methods: {
      openModal(negocio){
        this.isModalOpened = true;
        this.negocio = negocio

      },
      closeModal(){
        this.isModalOpened = false;
        this.$emit('modal-closed')
      },
      selectNegocioDestino(negocioDestinoId){
        this.transferencia.negocioCulturaDestinoId = negocioDestinoId;
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        this.$refs.stepperTransferencia.next();
      },
      goToPreviousStep(){
        this.$refs.stepperTransferencia.previous();
      },
      listBySearch: function(val){
        this.filter.search = val;
      },
      listNegocios(filter){
        this.negocioService.listNegocios(agroUtils.serialize(filter)).then(search => {
          this.negociosDestino = search;
        });
      },

      closeSearch(event){
        if(event === 'click'){
          this.search("");
        }
      },
      saveTransferencia(){
        let params = {
          negocio_cultura_destino_id: null,
          quantidade: null,
        };
        this.negocioService.setTransferenciaNegocio(this.negocio.id, params).then(negocios => {
          this.negocios = negocios;
        });
      },
    }
  }
</script>

<style scoped>
  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>
