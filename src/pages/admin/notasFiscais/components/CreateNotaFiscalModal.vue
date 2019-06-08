<template>
  <ap-modal ref="createNotaFiscalModal" title="Nova Nota Fiscal" :visible="isModalOpened" @hide="closeModal">

    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaNotaFiscal" @slide-trigger="setStepperIndex" v-if="notasFiscaisSeries">

      <!--PASSO 1 INFORMAR O EMITENTE-->
      <q-carousel-slide class="q-pa-none" style="padding-right: 1px">
        <template>
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione o emitente</span>
          </div>

          <div class="row justify-center">
            <div class="col-8 q-mt-lg">
              <q-select v-model="notaFiscal.notaFiscalSerieId.value"
                        stack-label="Série"
                        :options="parseNotasFiscaisSeries(notasFiscaisSeries)"
                        @input="changeNumeroSerie()"
              />
            </div>

            <div class="col-8">
              <q-input type="number" v-model="notaFiscal.numero.value" stack-label="Número" align="right"/>
            </div>

          </div>

        </template>
      </q-carousel-slide>

      <!--PASSO 2-->
      <q-carousel-slide>
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informações da nota</span>
        </div>

        <div class="row gutter-x-sm justify-center">
          <div class="col-8 q-mt-lg">
            <q-select v-model="notaFiscal.naturezaOperacaoId.value" stack-label="Natureza Operação" :options="parseNaturazaOperacao(naturezaOperacoes)" @input="selectNaturezaOperacao"/>
          </div>
          <div class="col-8">
            <q-select v-model="notaFiscal.isSaida.value" stack-label="Entrada/Saída" :options="saidaOrEntrada"/>
          </div>
          <div class="col-8">
            <q-select v-model="notaFiscal.frete.value" stack-label="Frete" :options="tiposFrete"/>
          </div>
        </div>
      </q-carousel-slide>

    </q-carousel>


    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep == 1"/>
        <!--<q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 0" :disabled="!isNextButtomEnabled()"/>-->
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 1"/>
        <q-btn @click="saveNotaFiscal()" flat label="Salvar" color="primary" v-if="currentStep === 1"/>
      </div>
    </div>

  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import NotaFiscalService from "../../../../assets/js/service/NotaFiscalService";
  import PessoaService from "../../../../assets/js/service/PessoaService";

  export default {
    name: "CreateNotaFiscal",
    components: {
      apModal
    },
    watch:{
      searchPessoasQuery: function(value){
        this.notaFiscal.pessoaId.value = null;
        if(value === ""){
          this.pessoas = null;
        }else{
          this.searchPessoas(value);
        }
      }
    },
    data(){
      return {
        pessoaService: new PessoaService(),
        notaFiscalService: new NotaFiscalService(),
        isModalOpened: false,
        currentStep: 0,
        searchPessoasQuery: '',
        pessoas: null,
        isSearching: false,
        notasFiscaisSeries: null,
        naturezaOperacoes: [],
        tiposFrete: [
          {
            label: '0 - Remetente (CIF)',
            value: 0
          },
          {
            label: '1 - Destinatario (FOB)',
            value: 1
          },
          {
            label: '2 - Terceiro',
            value: 2
          },
          {
            label: '3 - Remtetente Proprio',
            value: 3
          },
          {
            label: '4 - Destinatario Proprio',
            value: 4
          },
          {
            label: '9 - Sem Frete',
            value: 9
          },

        ],
        saidaOrEntrada: [
          {
            label: '0 - Entrada',
            value: 0
          },
          {
            label: '1 - Saída',
            value: 1
          },

        ],
        notaFiscal:{
          numero:{
            value: null,
            errorMessage: null
          },
          natureza:{
            value: null,
            errorMessage: null
          },
          naturezaOperacaoId:{
            value: null,
            errorMessage: null
          },
          finalidade:{
            value: null,
            errorMessage: null
          },
          presenca:{
            value: null,
            errorMessage: null
          },
          serie:{
            value: null,
            errorMessage: null
          },
          notaFiscalSerieId:{
            value: null,
            errorMessage: null
          },
          status:{
            value: 'Digitacao',
            errorMessage: null
          },
          frete:{
            value: null,
            errorMessage: null
          },
          isSaida:{
            value: null,
            errorMessage: null
          },
        }
      }
    },
    methods: {
      openModal(){
        this.isModalOpened = true;

        this.$refs.createNotaFiscalModal.showInnerProgress();
        Promise.all([
          this.listNaturezaOperacao(),
          this.listNotasFiscaisSeries(),
        ]).then(()=> {
          this.$refs.createNotaFiscalModal.hideInnerProgress();
        });
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
      },
      resetModal(){
        this.$refs.stepperNovaNotaFiscal.goToSlide(0);
        this.pessoas = null;
        this.searchPessoasQuery = '';
        this.clearNotaFiscal();
      },
      clearNotaFiscal(){
        this.notaFiscal ={
          numero:{
            value: null,
              errorMessage: null
          },
          natureza:{
            value: null,
              errorMessage: null
          },
          naturezaOperacaoId:{
            value: null,
              errorMessage: null
          },
          finalidade:{
            value: null,
              errorMessage: null
          },
          presenca:{
            value: null,
              errorMessage: null
          },
          serie:{
            value: null,
              errorMessage: null
          },
          notaFiscalSerieId:{
            value: null,
              errorMessage: null
          },
          status:{
            value: 'Digitacao',
              errorMessage: null
          },
          frete:{
            value: null,
              errorMessage: null
          },
          isSaida:{
            value: null,
              errorMessage: null
          },
        }
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      selectNaturezaOperacao(){
        let selectedNaturezaOperacao = this.naturezaOperacoes.find(operacao => operacao.id === this.notaFiscal.naturezaOperacaoId.value);
        this.notaFiscal.finalidade.value = selectedNaturezaOperacao.finalidade;
        this.notaFiscal.presenca.value = selectedNaturezaOperacao.presenca;
        this.notaFiscal.natureza.value = selectedNaturezaOperacao.nome;
      },
      async listNotasFiscaisSeries(){
        return this.notaFiscalService.listSeries().then(series => {
          this.notasFiscaisSeries = series;
        })
      },
      changeNumeroSerie(){
        this.notaFiscal.numero.value = this.getSerieById(this.notaFiscal.notaFiscalSerieId.value).ultima_nota_emitida + 1;
        this.notaFiscal.serie.value = this.getSerieById(this.notaFiscal.notaFiscalSerieId.value).serie;
      },
      getSerieById(id){
        return this.notasFiscaisSeries.find(serie => serie.id === id);
      },
      parseNotasFiscaisSeries: function(notasFiscaisSeries){
        return  notasFiscaisSeries.map(serie => {
          return {
            value: serie.id,
            label: serie.nome
          }
        });
      },
      isNextButtomEnabled(){
        if(this.currentStep === 0 && this.notaFiscal.pessoaId.value !== null){
          return true
        }
        return false
      },
      goToNextStep(){
        this.$refs.stepperNovaNotaFiscal.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaNotaFiscal.previous();
      },
      async listNaturezaOperacao(){
        this.$q.loading.show();
        return this.notaFiscalService.listNaturezaOperacao().then(naturezaOperacoes => {
          this.naturezaOperacoes = naturezaOperacoes;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
      parseNaturazaOperacao(naturezasOperacoes){
        return naturezasOperacoes.map(naturezaOperacao => {
          return {
            label: naturezaOperacao.nome,
            value: naturezaOperacao.id
          }
        })
      },
      getNotaFiscalValues(){
        let params = {
          numero: this.notaFiscal.numero.value,
          natureza: this.notaFiscal.natureza.value,
          natureza_operacao_id: this.notaFiscal.naturezaOperacaoId.value,
          finalidade: this.notaFiscal.finalidade.value,
          presenca: this.notaFiscal.presenca.value,
          serie: this.notaFiscal.serie.value,
          nota_fiscal_serie_id: this.notaFiscal.notaFiscalSerieId.value,
          status: this.notaFiscal.status.value,
          frete: this.notaFiscal.frete.value,
          is_saida: this.notaFiscal.isSaida.value,

          is_consumidor: false,
          ambiente: 2,
          tipo_emissao: 1,
          modelo: '55',
        };
        return params;
      },
      saveNotaFiscal(){
        // console.table(this.getNotaFiscalValues());
        this.$q.loading.show();
        this.notaFiscalService.createNotaFiscal(this.getNotaFiscalValues()).then(notaFiscal => {
          this.$q.notify({type: 'positive', message: 'Nota fiscal criada com sucesso'});
          this.$q.loading.hide();
          this.closeModal();
          this.$router.push({name: 'view_nota_fiscal', params: {id:notaFiscal.id}});
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error.response.data.message});
          this.$q.loading.hide();
        });
      },
      formatCPF(cpf){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      },
      formatCNPJ(cnpj){
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
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
