<template>
  <ap-modal ref="transferenciaModal" title="Nova Transferência" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperTransferencia" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER NEGOCIO DESTINO-->
      <q-carousel-slide class="q-pa-none"  style="width:300px;">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informar o negócio de destino</span>
        </div>

        <div>
          <div class="row justify-center q-mb-md">
            <q-search inverted-light color="grey-2" v-model="searchNegociosQuery" placeholder="Busque por um negócio"/>
          </div>

          <div class="relative-position">
            <q-scroll-area style="width: auto; height: 350px;">
              <q-list v-if="negociosCulturas" no-border separator link>
                <q-item v-for="negocioCultura in negociosCulturas" :key="negocioCultura.id" @click.native="selectNegocioCulturaDestino(negocioCultura.id)">

                  <q-item-main>

                    <q-item-tile>
                      {{negocioCultura.negocio.nome}} {{negocioCultura.negocio.safra}}
                    </q-item-tile>

                    <q-item-tile sublabel v-if="negocioCultura.negocio.numero_pedido">
                      Pedido {{negocioCultura.negocio.numero_pedido}}
                    </q-item-tile>

                    <q-item-tile sublabel v-if="negocioCultura.negocio.tipo_negocio.is_quantidade">
                      Contrato {{negocioCultura.negocio.numero_contrato}}
                    </q-item-tile>

                    <q-item-tile sublabel v-if="!negocioCultura.negocio.tipo_negocio.is_quantidade">
                      {{negocioCultura.negocio.numero_contrato}}
                    </q-item-tile>

                    <q-item-tile sublabel>
                  <span>
                    Entregue {{numeral(negocioCultura.negocio.quantidade_entregue).format('0,0')}}
                  </span>
                      <span v-if="negocioCultura.negocio.quantidade">
                    de {{numeral(negocioCultura.negocio.quantidade).format('0,0')}}
                  </span>
                      <!--{{negocioCultura.negocio.unidade_medida.sigla}}-->
                    </q-item-tile>

                  </q-item-main>
                  <q-item-side v-if="transferencia.negocioCulturaDestinoId === negocioCultura.id"
                               icon="check_circle"
                               color="positive"
                  />

                </q-item>
              </q-list>

              <div v-if="!negociosCulturas" class="list-empty">
                <q-icon name="warning" />
                <span>Busque pelo negócio no campo acima.</span>
              </div>
              <div v-if="negociosCulturas && negociosCulturas.length === 0" class="list-empty">
                <q-icon name="warning" />
                <span>Nenhuma negócio encontrado.</span>
              </div>
            </q-scroll-area>
            <q-inner-loading :visible="isSearching">
              <q-spinner size="60px"></q-spinner>
            </q-inner-loading>
          </div>
        </div>
      </q-carousel-slide>

      <!--PASSO 2 INFORMAR A QUANTIDADE DE TRANSFERENCIA-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe a quantidade a ser transferia</span>
        </div>

        <div class="q-px-lg q-py-sm text-center" v-if="transferencia.negocioCulturaDestinoId">
          <div style="display: inline-block">
            <div class="row gutter-x-sm q-mt-lg text-left linha-1">
              <div class="col-xs-12 col-sm-6 date-container" >
                <q-datetime v-model="transferencia.lancamento" type="datetime" label="Lançamento"
                            align="center" modal format="DD/MM/YYYY HH:mm"
                            :min="lancamentoMinDate" :max="lancamentoMaxDate"/>
              </div>
            </div>

            <div class="row q-mt-sm">
              <div class="col-12">
                <q-input stack-label="Descrição" v-model="transferencia.descricao" />
              </div>
            </div>

            <q-field label="Quantidade" orientation="vertical" class="q-mt-sm">
              <div class="row gutter-x-sm justify-center linha-3 ">
                <div class="col-xs-12 col-sm-6 kg-container">
                  <q-input v-model="quantidadeEmQuilograma"
                           suffix="Kg" align="right"
                           type="number" min="1" :max="currentNegocioCultura.quantidade_entregue" @blur="checkQuantidadeEmQuilograma"
                  />
                </div>

                <div class="col-xs-12 col-sm-6 sc-container">
                  <q-input v-model="quantidadeEmSaca"
                           suffix="SC60" align="right"
                           type="number" min="1" :max="currentNegocioCultura.quantidade_entregue / 60" @blur="checkQuantidadeEmSaca"
                  />
                </div>
              </div>
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
        <q-btn @click="saveTransferencia" flat label="Salvar" color="primary" :disable="transferencia.quantidade < 1" v-if="currentStep == 1"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import NegocioService from "assets/js/service/negocio/NegocioService";
  import agroUtils from "assets/js/AgroUtils";
  import apModal from 'components/ApModal'
  export default {
    name: "new-transferencia-modal",
    components: {
      apModal,
    },
    watch:{
      quantidadeEmSaca(){
        this.quantidadeEmQuilograma = this.quantidadeEmSaca * 60;
        this.transferencia.quantidade = this.quantidadeEmQuilograma;
      },
      quantidadeEmQuilograma(){
        this.quantidadeEmSaca = this.quantidadeEmQuilograma / 60;
        this.transferencia.quantidade = this.quantidadeEmQuilograma;
      },
      searchNegociosQuery(value){
        this.transferencia.negocioCulturaDestinoId = null;
        if(value === ""){
          this.negociosCulturas = null;
        }else{
          this.searchNegocios(value);
        }
      }
    },
    data(){
      return {
        negocioService: new NegocioService(),
        isModalOpened: false,
        negociosCulturas: null,
        currentStep: 0,
        searchNegociosQuery: '',
        currentNegocioCultura: null,
        currentArmazemId: null,
        isSearching: false,
        lancamentoMaxDate: null,
        lancamentoMinDate: null,
        quantidadeEmSaca: 0,
        quantidadeEmQuilograma: 0,
        transferencia: {
          quantidade: null,
          negocioCulturaDestinoId: null,
          lancamento: null,
          descricao: null
        }
      }
    },
    methods: {
      openModal(negocioCultura, armazemId){
        this.isModalOpened = true;
        this.currentNegocioCultura = negocioCultura;
        this.currentArmazemId = armazemId;
        this.transferencia.lancamento = new Date(this.moment()).toISOString();
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
      },
      resetModal(){
        this.$refs.stepperTransferencia.goToSlide(0);
        this.searchNegociosQuery = '';
        this.negociosCulturas = null;
        this.transferencia.quantidade = null;
        this.transferencia.negocioCulturaDestinoId = null;
        this.transferencia.descricao = null;
        this.quantidadeEmSaca = 0;
        this.quantidadeEmQuilograma = 0;
      },
      checkQuantidadeEmSaca(){
        if(this.quantidadeEmSaca > this.currentNegocioCultura.quantidade_entregue / 60){
          this.quantidadeEmSaca = this.currentNegocioCultura.quantidade_entregue / 60;
        }
      },
      checkQuantidadeEmQuilograma(){
        if(this.quantidadeEmQuilograma > this.currentNegocioCultura.quantidade_entregue){
          this.quantidadeEmQuilograma = this.currentNegocioCultura.quantidade_entregue;
        }
      },
      selectNegocioCulturaDestino(negocioCulturaId){
        this.transferencia.negocioCulturaDestinoId = negocioCulturaId;
        this.goToNextStep();
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
      searchNegocios(params) {
        this.isSearching = true;
        let filter = {
          type: 'all',
          search: params,
        };

        this.negocioService.listNegociosCulturasParaTransferir(this.currentNegocioCultura.id, agroUtils.serialize(filter)).then(negociosCulturas => {
          this.negociosCulturas = negociosCulturas;
          this.isSearching = false;
        });
      },
      saveTransferencia(){
        let params = {
          armazem_id: this.currentArmazemId,
          negocio_cultura_destino_id: this.transferencia.negocioCulturaDestinoId,
          quantidade: this.transferencia.quantidade,
          lancamento: this.transferencia.lancamento,
          descricao: this.transferencia.descricao
        };
        this.negocioService.transferirParaNegocio(this.currentNegocioCultura.id, params).then(() => {
          this.$q.notify({type: 'positive', message: 'Transferencia efetuada'});
          this.$root.$emit('refreshNegocioMovimentos');
          this.closeModal();
        });
      },
    },
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
