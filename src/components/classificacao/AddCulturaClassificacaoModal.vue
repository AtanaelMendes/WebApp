<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal" :content-css="{minWidth: '300px', minHeight:'250px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Adicionar cultura classificação
      </div>

      <div class="row q-pa-md">
        <div class="col-12" @keyup.enter="addCulturaClassificacao()">

          <q-field :error="culturaClassificacao.culturaId.error" :error-label="culturaClassificacao.culturaId.errorMessage">
            <q-search v-model="terms" float-label="Cultura" @blur="checkCulturaInput" v-on:input="clearErrorMessage()">
              <q-autocomplete
                @search="searchCulturaByName"
                @selected="selectedCultura"
                :min-characters="2"
                value-field="label"
              />
            </q-search>
          </q-field>

          <q-field :error="culturaClassificacao.tolerancia.error" :error-label="culturaClassificacao.tolerancia.errorMessage">
            <q-input
              suffix="%"
              type="number"
              align="right"
              float-label="Tolerância"
              @input="clearErrorMessage()"
              v-model="culturaClassificacao.tolerancia.value"
            />
          </q-field>

        </div>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="addCulturaClassificacao"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import ClassificacaoService from "assets/js/service/ClassificacaoService";
  import CulturaClassificacaoService from "assets/js/service/cultura/CulturaClassificacaoService";
  import CulturaService from "assets/js/service/cultura/CulturaService";
  export default {
    name: "add-cultura-classificacao-modal",
    components:{},
    data(){
      return {
        classificacaoService: new ClassificacaoService(),
        culturaClassificacaoService: new CulturaClassificacaoService(),
        culturaService: new CulturaService(),
        isModalOpened: false,
        tempCulturaList: [],
        terms: null,
        culturaClassificacao: {
          culturaId: {
            value: null,
            error: false,
            errorMessage: null
          },
          tolerancia: {
            value: null,
            error: false,
            errorMessage: null
          },
        },
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
        this.clearFields();
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.clearFields();
      },
      nomeIsValid: function(){
        if(this.culturaClassificacao.culturaId.value === null || this.culturaClassificacao.culturaId.value === ''){
          this.culturaClassificacao.culturaId.error = true;
          this.culturaClassificacao.culturaId.errorMessage = 'Informe a cultura';
          return false
        }
        return true
      },
      toleranciaIsValid: function(){
        if(this.culturaClassificacao.tolerancia.value === null || this.culturaClassificacao.tolerancia.value === ''){
          this.culturaClassificacao.tolerancia.error = true;
          this.culturaClassificacao.tolerancia.errorMessage = 'informe a tolerância';
          return false
        }
        if( this.culturaClassificacao.tolerancia.value != null){
          if(this.culturaClassificacao.tolerancia === 0 ){
            this.culturaClassificacao.tolerancia.error = true;
            this.culturaClassificacao.tolerancia.errorMessage = 'A tolerância deve ser maior que zero(0)';
            return false
          }
        }
        return true
      },
      clearErrorMessage: function(){
        this.culturaClassificacao.culturaId.errorMessage = null;
        this.culturaClassificacao.culturaId.error = false;
        this.culturaClassificacao.tolerancia.errorMessage = null;
        this.culturaClassificacao.tolerancia.error = false;
      },
      addCulturaClassificacao: function(){
        if( !this.nomeIsValid() || !this.toleranciaIsValid()){
          return
        }
        let params = {
          cultura_id: this.culturaClassificacao.culturaId.value,
          tolerancia: this.culturaClassificacao.tolerancia.value,
          classificacao_id: this.$route.params.id,
        };
        this.$q.loading.show();
        this.culturaClassificacaoService.addCulturaClassificacao(params).then(() => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Cultura adicionada com sucesso.'});
          this.$root.$emit('refreshCulturaClassificacaoView');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          this.$q.loading.hide();
          if(error.response.status === 422){
            this.$q.dialog({
              title: 'Ops',
              message: ''+error.response.data.cultura_id,
              ok: true,
            });
            // this.$q.notify({type: 'negative', message: '' + error.response.data.cultura_id});
          }else{
            this.$q.notify({type: 'negative', message: 'Não foi possível adicionar cultura a classificação'});
          }
        })
      },
      searchCulturaByName: function(terms, done) {
        this.culturaService.searchCulturaByName(terms).then(culturas => {
          this.tempCulturaList = culturas;
          done(culturas)
        });
      },
      selectedCultura: function(culturaId){
        this.culturaClassificacao.culturaId.value = culturaId.id;
      },
      checkCulturaInput(){
        let result = this.tempCulturaList.filter(item => ('' + item['label']).toLowerCase() === this.terms.toLowerCase());
        if(result.length === 0){
          this.terms = '';
          this.$emit('input', '');
          this.clearErrorMessage();
        }else{
          this.$emit('input', result[0])
        }
      },
      clearFields: function(){
        this.culturaClassificacao.culturaId.value = null;
        this.culturaClassificacao.culturaId.error = false;
        this.culturaClassificacao.culturaId.errorMessage = null;
        this.culturaClassificacao.tolerancia.value = null;
        this.culturaClassificacao.tolerancia.error = false;
        this.culturaClassificacao.tolerancia.errorMessage = null;
        this.tempCulturaList = [];
        this.terms = null;
      },
    }
  }
</script>

<style scoped>

</style>
