<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Novo Armazém" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <form @keyup.enter="addArmazem()">

          <q-field class="q-mb-sm" :error="armazem.nome.error" :error-label="armazem.nome.errorMessage">
            <q-input v-model="armazem.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

        </form>
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" align="end">
        <q-btn label="Salvar" color="primary" @click.native="addArmazem()"/>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import armazemService from 'assets/js/service/CaminhaoService'
  export default {
    name: "armazem-add",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        armazem: {
          nome: {
            value: null,
            error: false,
            errorMessage: null
          },
          localizacaoId: {
            value: null,
            error: false,
            errorMessage: null
          }
        },
      }
    },
    methods: {
      nomeIsValid: function(){
        if(this.armazem.nome.value === null || this.armazem.nome.value === ''){
          this.armazem.nome.error = true;
          this.armazem.nome.errorMessage = 'informe o nome do armazém';
          return false
        }
        if( this.armazem.nome.value != null){
          if(this.armazem.nome.value.length < 3){
            this.armazem.nome.error = true;
            this.armazem.nome.errorMessage = 'nome muito curto min 3 caracteres';
            return false
          }
        }
        return true
      },
      clearErrorMessage: function(){
        this.armazem.nome.errorMessage = null;
        this.armazem.nome.error = false;
        this.armazem.localizacaoId.errorMessage = null;
        this.armazem.localizacaoId.error = false;
      },
      addArmazem: function(){
        if( !this.nomeIsValid() ){
          return
        }
        let params = {
          nome: this.armazem.nome.value,
          localizacao_id: this.armazem.localizacaoId.value,

        };
        this.$q.loading.show();
        armazemService.addArmazem(params).then(response => {
          this.$q.notify({type: 'positive', message: 'Armazém adicionado com sucesso.'});
          this.$q.loading.hide();
          this.backAction();
        }).catch(error =>{
          this.$q.loading.show();
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o armazém'})
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
