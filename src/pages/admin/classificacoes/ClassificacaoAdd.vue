<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Nova classificação" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" @keyup.enter="addClassificacao()">
        <q-field class="q-mb-sm" :error="classificacao.nome.error" :error-label="classificacao.nome.errorMessage">
          <q-input v-model="classificacao.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
        </q-field>
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" align="end">
        <q-btn label="Salvar" color="primary" @click.native="addClassificacao()"/>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import ClassificacaoService from "../../../assets/js/service/ClassificacaoService";
  export default {
    name: "classificacao-add",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        ClassificacaoService: new ClassificacaoService(),
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
          this.$q.notify({type: 'positive', message: 'Classificação adicionada com sucesso.'});
          this.backAction();
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o classificação'})
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
    },
  }
</script>

<style scoped>
</style>
