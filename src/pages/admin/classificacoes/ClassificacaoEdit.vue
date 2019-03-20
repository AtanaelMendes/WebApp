<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Editar classificação" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" @keyup.enter="updateClassificacao()">
        <q-field class="q-mb-sm" :error="classificacao.nome.error" :error-label="classificacao.nome.errorMessage">
          <q-input v-model="classificacao.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
        </q-field>
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" align="end">
        <q-btn label="Salvar" color="primary" @click.native="updateClassificacao()"/>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import ClassificacaoService from "../../../assets/js/service/ClassificacaoService";
  export default {
    name: "classificacao-update",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
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
      updateClassificacao: function(){
        if( !this.nomeIsValid() ){
          return
        }
        this.$q.loading.show();
        let params = {
          nome: this.classificacao.nome.value,
        };
        this.classificacaoService.updateClassificacao(this.$route.params.id, params).then(() => {
          this.$q.notify({type: 'positive', message: 'Classificação alterada com sucesso.'});
          this.$q.loading.hide();
          this.backAction();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar as alterações'});
          this.$q.loading.show();
        })
      },
      getClassificacaoById: function(id){
        this.$q.loading.show();
        this.classificacaoService.getClassificacaoById(id).then(request => {
          this.fillFormClassificacao(request);
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar as alterações'})
          this.$q.loading.hide();
        })
      },
      fillFormClassificacao: function(response){
        this.classificacao.nome.value = response.nome;
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.getClassificacaoById(this.$route.params.id);
    },
  }
</script>

<style scoped>
</style>
