<template>
  <q-modal key="addArmazem" v-model="isModalOpened" maximized @hide="closeModal">
    <div class="row justify-center items-center q-px-md" style="min-height: 80vh">

      <div class="col-12 text-center q-display-1">
        Nova Classificação
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" @keyup.enter="addClassificacao()">

        <q-field :error="classificacao.nome.error" :error-label="classificacao.nome.errorMessage">
          <q-input v-model="classificacao.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
        </q-field>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="salvar" color="primary" @click="addClassificacao"/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import ClassificacaoService from "assets/js/service/ClassificacaoService";
  export default {
    name: "add-classificacao-modal",
    components:{},
    data () {
      return {
        isModalOpened: false,
        classificacaoService: new ClassificacaoService(),
        classificacao: {
          nome: {
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
        if(this.classificacao.nome.value === null || this.classificacao.nome.value === ''){
          this.classificacao.nome.error = true;
          this.classificacao.nome.errorMessage = 'informe o nome da classificação';
          return false
        }
        if( this.classificacao.nome.value != null){
          if(this.classificacao.nome.value.length < 3){
            this.classificacao.nome.error = true;
            this.classificacao.nome.errorMessage = 'nome muito curto';
            return false
          }
        }
        return true
      },
      clearErrorMessage: function(){
        this.classificacao.nome.errorMessage = null;
        this.classificacao.nome.error = false;
      },
      addClassificacao: function(){
        if( !this.nomeIsValid() ){
          return
        }
        let params = {
          nome: this.classificacao.nome.value,
        };
        this.$q.loading.show();
        this.classificacaoService.addClassificacao(params).then(() => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Classificação adicionada com sucesso.'});
          this.$root.$emit('refreshClassificacoesList');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o classificação'})
        })
      },
      clearFields: function(){
        this.classificacao.nome.value = null;
        this.classificacao.nome.error = false;
        this.classificacao.nome.errorMessage = null;
      },
    },
  }
</script>
<style scoped>
</style>
