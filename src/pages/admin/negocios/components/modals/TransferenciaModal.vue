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

        <q-list v-if="negociosDestino" no-border separator link>
          <q-item v-for="negocioDestino in negociosDestino" :key="negocioDestino.id" @click.native="selectNegocioDestino(negocioDestino)">

            <q-item-main>

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

            </q-item-main>
            <q-item-side v-if="transferencia.negocioCulturaDestinoId === negocioDestino.id"
                         icon="check_circle"
                         color="positive"
            />

          </q-item>
        </q-list>


        <div class="row" v-if="!negociosDestino">
          <div class="col-12" align="center">
            <q-icon name="compare_arrows" size="200px" color="grey-4"/>
          </div>
        </div>
      </q-carousel-slide>

      <!--PASSO 2 INFORMAR A QUANTIDADE DE TRANSFERENCIA-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe a Quantidade</span>
        </div>
        <div class="q-px-lg q-py-sm row justify-center" v-if="selectedNegocio">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-6">
            <q-field>
              <q-input v-model="transferencia.quantidade"
                       float-label="Quantidade"
                       clearable align="right"
                       :suffix="selectedNegocio.unidadeMedida.sigla"
                       type="number"
              />
            </q-field>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep !== 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 1"
               :disable="transferencia.negocioCulturaDestinoId === null"
        />
        <q-btn @click="saveTransferencia" flat label="Salvar" color="primary" :disable="transferencia.quantidade > 1" v-if="currentStep == 1"/>
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
        negociosDestino: null,
        selectedNegocio: null,
        hasSearch: true,
        currentStep: 0,
        searchValueByStep: null,
        negocio: null,
        filter: {
          type: 'all',
          search: ' ',
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
          if(val.search.length > 2){
            this.listNegocios(filter)
          }

        },
        deep: true,
      }
    },
    methods: {
      openModal(negocio){
        this.isModalOpened = true;
        this.negocio = negocio;
        this.transferencia.negocioCulturaOrigemId = negocio.id;
        this.searchValueByStep = new Map();
      },
      closeModal(){
        this.isModalOpened = false;
        this.$emit('modal-closed');
        this.clearFields();
      },
      selectNegocioDestino(negocioDestino){
        this.selectedNegocio = negocioDestino;
        this.transferencia.negocioCulturaDestinoId = negocioDestino.id;
        this.goToNextStep();
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        this.$refs.transferenciaModal.closeSearch(true);
        this.$refs.stepperTransferencia.next();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.transferenciaModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      goToPreviousStep(){
        this.$refs.transferenciaModal.closeSearch(true);
        this.$refs.stepperTransferencia.previous();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.transferenciaModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      listBySearch: function(value){
        if(value === ""){
          this.searchValueByStep.delete(this.currentStep);
        }else{
          this.searchValueByStep.set(this.currentStep, value);
        }

        this.filter.search = value;
      },
      listNegocios(filter){
        this.negocioService.listNegocios(agroUtils.serialize(filter)).then(search => {
          this.negociosDestino = search;
        });
      },
      clearFields(){
        this.filter.search = null;
        this.negociosDestino = null;
        this.selectedNegocio = null;
        this.transferencia.quantidade = null;
        this.transferencia.negocioCulturaOrigemId = null;
        this.transferencia.negocioCulturaDestinoId = null;
      },
      closeSearch(event){
        if(event === 'click'){
          this.listBySearch("");
        }
      },
      saveTransferencia(){
        let params = {
          negocio_cultura_destino_id: this.transferencia.negocioCulturaDestinoId,
          quantidade: this.transferencia.quantidade,
        };
        this.negocioService.setTransferenciaNegocio(this.negocio.id, params).then(negocios => {
          this.$q.notify({type: 'positive', message: 'Transferencia efetuada'});
          // this.negocios = negocios;
          this.closeModal();
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
