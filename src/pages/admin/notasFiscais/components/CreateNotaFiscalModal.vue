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
                        float-label="Série"
                        :options="parseNotasFiscaisSeries(notasFiscaisSeries)"
                        @input="changeNumeroSerie()"
              />
            </div>

            <div class="col-8">
              <q-input type="number" v-model="notaFiscal.numero.value" float-label="Número" align="right"/>
            </div>

            <div class="col-8">
              <q-datetime v-model="notaFiscal.emissao.value" float-label="Emissão" type="datetime" align="center" format="DD/MM/YYYY HH:MM" modal/>
            </div>
          </div>

        </template>
      </q-carousel-slide>

      <!--PASSO 1 INFORMAR O REMETENTE-->
      <q-carousel-slide class="q-pa-none" style="padding-right: 1px">
        <template>
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione o remetente</span>
          </div>

          <div>
            <div class="row justify-center q-mb-md">
              <q-search inverted-light color="grey-2" v-model="searchPessoasQuery" placeholder="Busque por uma pessoa"/>
            </div>

            <div class="relative-position">
              <q-scroll-area style="width: auto; height: 350px;">
                <q-list no-border link separator>
                  <template v-for="grupo in pessoas">
                    <q-list-header :key="grupo.id" class="q-py-sm" style="min-height: unset; background: #f9f9f9; border-bottom: 1px solid #e2e2e2; border-top: 1px solid #e2e2e2;">
                      {{grupo.nome}}
                    </q-list-header>
                    <q-item @click.native="selectPesssoa(pessoa.id)" v-for="pessoa in grupo.pessoas" :key="pessoa.id">
                      <q-item-main>
                        <q-item-tile label>{{pessoa.nome}}</q-item-tile>
                        <q-item-tile sublabel v-if="pessoa.cpf">{{formatCPF(pessoa.cpf)}}</q-item-tile>
                        <q-item-tile sublabel v-if="pessoa.cnpj">{{formatCNPJ(pessoa.cnpj)}}</q-item-tile>
                        <q-item-tile sublabel>{{pessoa.inscricao_estadual}} {{pessoa.inscricao_municipal}}</q-item-tile>
                      </q-item-main>

                      <q-item-side right>
                        <q-btn icon="done" size="8px" round dense color="positive" v-if="pessoa.id == notaFiscal.pessoaId.value"/>
                      </q-item-side>
                    </q-item>
                  </template>
                </q-list>
                <div v-if="!pessoas" class="list-empty">
                  <q-icon name="warning" />
                  <span>Busque pela pessoa no campo acima.</span>
                </div>
                <div v-if="pessoas && pessoas.length === 0" class="list-empty">
                  <q-icon name="warning" />
                  <span>Nenhuma pessoa encontrada.</span>
                </div>

              </q-scroll-area>

              <q-inner-loading :visible="isSearching">
                <q-spinner size="60px"></q-spinner>
              </q-inner-loading>
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
            <q-select v-model="notaFiscal.naturezaOperacaoId.value" float-label="Natureza Operação" :options="parseNaturazaOperacao(naturezaOperacoes)" @input="selectNaturezaOperacao"/>
          </div>
          <div class="col-8">
            <q-select v-model="notaFiscal.isSaida.value" float-label="Entrada/Saída" :options="saidaOrEntrada"/>
          </div>
          <div class="col-8">
            <q-select v-model="notaFiscal.frete.value" float-label="Frete" :options="tiposFrete"/>
          </div>
        </div>
      </q-carousel-slide>

    </q-carousel>


    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep == 1 || currentStep == 2"/>
        <!--<q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 0" :disabled="!isNextButtomEnabled()"/>-->
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 2"/>
        <q-btn @click="saveNotaFiscal()" flat label="Salvar" color="primary" v-if="currentStep === 2"/>
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
          pessoaId:{
            value: null,
            errorMessage: null
          },
          emissao:{
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
      selectPesssoa(id){
        this.notaFiscal.pessoaId.value = id;
        this.goToNextStep();
      },
      searchPessoas(params) {
        this.isSearching = true;
        this.pessoaService.searchPessoaGroupedByGrupoEconomico(params).then(result => {
          this.pessoas = result;
          this.isSearching = false;
        });
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
        this.notaFiscalService.createNotaFiscal(this.getNotaFiscalValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Nota fiscal criada com sucesso'});
          this.$q.loading.hide();
          this.closeModal();
          this.$root.$emit('refreshNotasFiscaisList');
        }).catch(error => {
          console.log('AQUI O ERRO', error.response);
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
