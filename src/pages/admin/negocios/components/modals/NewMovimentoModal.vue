<template>
  <ap-modal ref="newMovimentoModal" title="Novo movimento" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperMovimento" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER O TIPO DE MOVIMENTO-->
      <q-carousel-slide class="q-pa-none" style="width:300px; height: 200px">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informar o tipo de movimento</span>
        </div>

        <div class="q-px-lg q-py-sm" style="text-align: center">
          <q-card style="width: 110px" class="movimento-tipo-card cursor-pointer" flat inline
                  @click.native="selectTipoMovimento(tipo.id)" v-for="tipo in tiposMovimentos" :key="tipo.id">
            <q-card-main>
              <div class="movimento-tipo-icon" v-bind:class="{'movimento-tipo-icon-selected':isMovimentoTipoSelected(tipo.id)}">{{tipo.sigla}}</div>
              <div class="movimento-tipo-nome">{{tipo.nome}}</div>
            </q-card-main>
          </q-card>
        </div>

      </q-carousel-slide>

      <!--PASSO 2 INFORMAR A QUANTIDADE DO MOVIMENTO-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe a quantidade</span>
        </div>
        <div class="row justify-center" v-if="negocioCultura">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-field>
              <q-input v-model="movimento.quantidade"
                       stack-label="Quantidade"
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
  import apModal from 'components/ApModal'
  export default {
    name: "new-movimento-modal",
    components: {
      apModal,
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

        this.$refs.newMovimentoModal.showInnerProgress();
        Promise.all([
          this.listTiposMovimento(),
        ]).then(()=> {
          this.$refs.newMovimentoModal.hideInnerProgress();
        });
      },
      closeModal(){
        this.isModalOpened = false;
        this.$emit('modal-closed');
        this.resetModal();
      },
      resetModal(){
        this.$refs.stepperMovimento.goToSlide(0);
        this.movimento.quantidade = null;
        this.movimento.movimentoTipoId = null;
      },
      selectTipoMovimento(tipoId){
        this.movimento.movimentoTipoId = tipoId;
        this.goToNextStep();
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        this.$refs.stepperMovimento.next();
      },
      goToPreviousStep(){
        this.$refs.stepperMovimento.previous();
      },
      isMovimentoTipoSelected(id){
        if(this.movimento.movimentoTipoId === null){
          return false;
        }
        if(this.movimento.movimentoTipoId === id){
          return true;
        }
      },
      listTiposMovimento(){
        this.negocioService.listTiposMovimentos().then(tipos => {
          this.tiposMovimentos = tipos;
        });
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
          movimento_tipo_id: this.movimento.movimentoTipoId,
          quantidade: this.movimento.quantidade,
        };
        this.negocioService.saveMovimento(this.negocioCultura.id, params).then(() => {
          this.$q.notify({type: 'positive', message: 'Movimento efetuado com sucesso'});
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
  .movimento-tipo-card{
    text-align: center;
    margin: 8px;
  }
  .movimento-tipo-icon{
    background: #f3f1f1;
    display: inline-block;
    width: 60px;
    height: 60px;
    font-weight: 400;
    font-size: 16px;
    line-height: 60px;
    border-radius: 60px;
  }
  .movimento-tipo-nome{
    margin-top: 12px;
    font-size: 16px;
    color: #454545;
  }
  .movimento-tipo-icon-selected{
    background: #005f5f;
    color: white;
  }
</style>
