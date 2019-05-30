<template>
  <ap-modal ref="editMovimentoModal" title="Editar movimento" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperMovimento" v-if="movimento" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER O TIPO DE MOVIMENTO-->
      <q-carousel-slide class="q-pa-none" style="width:300px; height: 300px">
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
        <div class="q-px-lg q-py-sm text-center" v-if="currentNegocioCultura">
          <div style="display: inline-block">

            <div class="row gutter-x-sm q-mt-lg text-left linha-1">
              <div class="col-xs-12 col-sm-6 date-container" >
                <q-datetime v-model="movimento.lancamento" type="datetime" label="Lançamento"
                            align="center" modal format="DD/MM/YYYY HH:mm"
                            :min="lancamentoMinDate" :max="lancamentoMaxDate"/>
              </div>
              <div class="col-xs-12 col-sm-6 toggle-container" style="align-self: center;text-align: center;">
                <q-btn-toggle inverted size="sm"
                              toggle-color="primary"
                              v-model="quantidadeTipo"
                              :options="[{label: 'Entrada', value: 0},{label: 'Saída', value: 1}]"/>
              </div>
            </div>

            <div class="row q-mt-sm">
              <div class="col-12">
                <q-input stack-label="Descrição" v-model="movimento.descricao" />
              </div>
            </div>

            <q-field label="Quantidade" orientation="vertical" class="q-mt-sm">
              <div class="row gutter-x-sm justify-center linha-3 ">
                <div class="col-xs-12 col-sm-6 kg-container">
                  <q-input v-model="quantidadeEmQuilograma"
                           suffix="Kg" align="right"
                           type="number" min="1" @blur="checkQuantidadeEmQuilograma"
                  />
                </div>

                <div class="col-xs-12 col-sm-6 sc-container">
                  <q-input v-model="quantidadeEmSaca"
                           suffix="SC60" align="right"
                           type="number" min="1" @blur="checkQuantidadeEmSaca"
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
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 1" />
        <q-btn @click="updateMovimento" flat label="Salvar" color="primary" :disable="!isFormValid()" v-if="currentStep == 1"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import NegocioService from "assets/js/service/negocio/NegocioService";
  import apModal from 'components/ApModal'
  export default {
    name: "EditMovimentoModal",
    components: {
      apModal,
    },
    watch:{
      quantidadeEmSaca(){
        this.quantidadeEmQuilograma = this.quantidadeEmSaca * 60;
        this.movimento.quantidade = this.quantidadeEmQuilograma;
      },
      quantidadeEmQuilograma(){
        this.quantidadeEmSaca = this.quantidadeEmQuilograma / 60;
        this.movimento.quantidade = this.quantidadeEmQuilograma;
      }
    },
    data(){
      return {
        negocioService: new NegocioService(),
        isModalOpened: false,
        tiposMovimentos: [],
        currentStep: 0,
        currentNegocioCultura: null,
        currentMovimentoId: null,
        lancamentoMaxDate: null,
        lancamentoMinDate: null,
        quantidadeTipo: 0,
        quantidadeEmSaca: 0,
        quantidadeEmQuilograma: 0,
        movimento: {
          quantidade: null,
          movimentoTipoId: null,
          lancamento: null,
          descricao: null,
        }
      }
    },
    methods: {
      openModal(id, negocioCultura, dataEmissaoNegocio) {
        this.isModalOpened = true;
        this.currentMovimentoId = id;
        this.currentNegocioCultura = negocioCultura;
        this.lancamentoMinDate = dataEmissaoNegocio;

        this.$refs.editMovimentoModal.showInnerProgress();
        Promise.all([
          this.listTiposMovimento(),
          this.getMovimento(id),
        ]).then(()=> {
          this.$refs.editMovimentoModal.hideInnerProgress();
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
        this.movimento.descricao = null;
        this.tiposMovimentos = [];
        this.quantidadeEmSaca = 0;
        this.quantidadeEmQuilograma = 0;
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
      checkQuantidadeEmSaca(){
        if(this.quantidadeEmSaca < 0){
          this.quantidadeEmSaca = 0;
        }
      },
      checkQuantidadeEmQuilograma(){
        if(this.quantidadeEmQuilograma < 0){
          this.quantidadeEmQuilograma = 0;
        }
      },
      isFormValid(){
        if(this.movimento.quantidade === null || this.movimento.quantidade < 1){
          return false
        }
        if(this.movimento.movimentoTipoId === null || this.movimento.movimentoTipoId === undefined){
          return false
        }
        if(this.movimento.lancamento === null){
          return false
        }
        if(this.movimento.descricao === null || this.movimento.descricao === ""){
          return false
        }
        return true
      },
      async listTiposMovimento(){
        return this.negocioService.listTiposMovimentos().then(tipos => {
          this.tiposMovimentos = tipos;
        });
      },
      async getMovimento(id){
        return this.negocioService.getMovimento(id).then(movimento => {
          this.movimento.movimentoTipoId = movimento.tipo.id;
          this.quantidadeTipo = movimento.quantidade > 0 ? 0 : 1;
          this.movimento.quantidade = this.quantidadeTipo === 1 ? Math.abs(movimento.quantidade) : movimento.quantidade;
          this.quantidadeEmQuilograma = this.movimento.quantidade;
          this.movimento.lancamento = movimento.lancamento;
          this.movimento.descricao = movimento.descricao;
          this.lancamentoMaxDate = this.movimento.lancamento;
        });
      },
      updateMovimento(){
        if (!this.isFormValid()){
          this.$q.notify({type: 'negative', message: 'Preencha as informações corretamente'});
          return
        }

        let params = {
          movimento_tipo_id: this.movimento.movimentoTipoId,
          quantidade: this.quantidadeTipo === 0 ? this.movimento.quantidade : -this.movimento.quantidade,
          lancamento: this.movimento.lancamento,
          descricao: this.movimento.descricao
        };
        this.$refs.editMovimentoModal.showOuterProgress();
        this.negocioService.updateMovimento(this.currentMovimentoId, params).then(() => {
          this.$q.notify({type: 'positive', message: 'Movimento atualizado com sucesso'});
          this.$refs.editMovimentoModal.hideOuterProgress();
          this.$root.$emit('refreshNegocioMovimentos');
          this.closeModal();
        })
      }
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

  @media (max-width: 575px) {
    .q-modal-layout .linha-1 .date-container {
      order:2;
    }

    .q-modal-layout .linha-1 .toggle-container {
      order:1;
      margin-bottom: 16px;
    }
    .q-modal-layout .linha-3 .kg-container {
      margin-bottom: 16px;
    }
  }
</style>
