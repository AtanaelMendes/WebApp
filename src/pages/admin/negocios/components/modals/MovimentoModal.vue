<template>
  <ap-modal ref="transferenciaModal" title="Novo movimento" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperTransferencia" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER O TIPO DE MOVIMENTO-->
      <q-carousel-slide class="q-pa-none" style="width:300px; height: 200px">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informar tipo de movimento</span>
        </div>

        <div class="row justify-center">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-field>
              <q-select v-model="movimento.movimentoTipoId" :options="tiposMovimentos" float-label="Tipo de movimento"/>
            </q-field>
          </div>
        </div>

      </q-carousel-slide>

      <!--PASSO 2 INFORMAR A QUANTIDADE DO MOVIMENTO-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe a Quantidade</span>
        </div>
        <div class="row justify-center" v-if="negocioCultura">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-field>
              <q-input v-model="movimento.quantidade"
                       float-label="Quantidade"
                       clearable align="right"
                       :suffix="negocioCultura.unidade_medida.sigla"
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
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 1" />
        <q-btn @click="saveMovimento" flat label="Salvar" color="primary" :disable="!isFormValid()" v-if="currentStep == 1"/>
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
    name: "movimento-modal",
    components: {
      apModal,
      apImage,
    },
    watch:{
    },
    data(){
      return {
        negocioService: new NegocioService(),
        isModalOpened: false,
        tiposMovimentos: [],
        selectedNegocio: null,
        currentStep: 0,
        negocioCultura: null,
        movimento: {
          quantidade: null,
          movimentoTipoId: null,
        }
      }
    },
    methods: {
      openModal(negocioCultura){
        this.isModalOpened = true;
        this.negocioCultura = negocioCultura;
        this.movimento.movimentoTipoId = negocioCultura.id;
      },
      closeModal(){
        this.isModalOpened = false;
        this.$emit('modal-closed');
        this.clearFields();
      },
      selectTipoMovimento(tipo){
        this.movimento.movimentoTipoId = tipo;
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
      listTiposMovimento(){
        this.negocioService.listTiposMovimento().then(result => {
          this.tiposMovimentos = result;
        });
      },
      clearFields(){
        this.movimento.quantidade = null;
        this.movimento.movimentoTipoId = null;
      },
      isFormValid(){
        if(this.movimento.quantidade === null || this.movimento.quantidade < 1){
          return false
        }
        if(this.movimento.movimentoTipoId === null || this.movimento.movimentoTipoId === undefined){
          return false
        }
        return true
      },
      saveMovimento(){
        if (!this.isFormValid()){
          this.$q.notify({type: 'negative', message: 'Preencha as informações corretamente'});
          return
        }
        let params = {
          negocio_cultura_movimento_tipo_id: this.movimento.movimentoTipoId,
          quantidade: this.movimento.quantidade,
        };
        this.negocioService.setMovimentoNegocio(this.negocioCultura.id, params).then(negocios => {
          this.$q.notify({type: 'positive', message: 'Movimento efetuado com sucesso'});
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
