<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal" :content-css="{minWidth: '300px', minHeight:'250px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Adicionar cultura
      </div>

      <div class="row q-pa-md">
        <div class="col-12" @keyup.enter="addClassificacao()">

          <q-field :error="culturaClassificacao.culturaId.error" :error-label="culturaClassificacao.culturaId.errorMessage">
            <q-search placeholder="Cultura">
              <q-autocomplete @search="searchCulturaByName" @selected="selected" />
            </q-search>
          </q-field>

          <q-field :error="culturaClassificacao.tolerancia.error" :error-label="culturaClassificacao.tolerancia.errorMessage">
            <q-input align="right" type="number" v-model="culturaClassificacao.tolerancia.value" float-label="Tolerância" @input="clearErrorMessage()"/>
          </q-field>

        </div>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="addClassificacao"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import ClassificacaoService from "assets/js/service/ClassificacaoService";
  import CulturaService from "assets/js/service/cultura/CulturaService";
  export default {
    name: "add-cultura-classificacao-modal",
    components:{},
    data(){
      return {
        classificacaoService: new ClassificacaoService(),
        culturaService: new CulturaService(),
        isModalOpened: false,
        tempCulturaList: [],
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
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      nomeIsValid: function(){
        if(this.culturaClassificacao.culturaId.value === null || this.culturaClassificacao.culturaId.value === ''){
          this.culturaClassificacao.culturaId.error = true;
          this.culturaClassificacao.culturaId.errorMessage = 'informe o culturaId da classificação';
          return false
        }
        if( this.culturaClassificacao.culturaId.value != null){
          if(this.culturaClassificacao.culturaId.value.length < 3){
            this.culturaClassificacao.culturaId.error = true;
            this.culturaClassificacao.culturaId.errorMessage = 'culturaId muito curto';
            return false
          }
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
          tolerancia: this.culturaClassificacao.culturaId.value,
          classificacao_id: this.$route.params.id,
        };
        this.$q.loading.show();
        this.classificacaoService.addCulturaClassificacao(params).then(() => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Cultura adicionada com sucesso.'});
          this.$root.$emit('refreshCulturaClassificacaoView');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar cultura a classificação'})
        })
      },
      searchCulturaByName: function(terms, done) {
        this.culturaService.searchCulturaByName(terms).then(culturas => {
          this.tempCulturaList = culturas;
          done(culturas)
        });
      },
      selected: function(){},
      clearFields: function(){
        this.culturaClassificacao.culturaId.value = null;
        this.culturaClassificacao.culturaId.error = false;
        this.culturaClassificacao.culturaId.errorMessage = null;
        this.culturaClassificacao.tolerancia.value = null;
        this.culturaClassificacao.tolerancia.error = false;
        this.culturaClassificacao.tolerancia.errorMessage = null;
      },
    }
  }
</script>

<style scoped>

</style>
