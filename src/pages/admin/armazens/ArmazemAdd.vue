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

          <q-field class="q-mb-sm" :error="armazem.localizacaoId.error" :error-label="armazem.localizacaoId.errorMessage">
            <q-select :options="localizacaoOptions" float-label="Localização" v-model="armazem.localizacaoId.value" @input="clearErrorMessage()"/>
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
  import localizacaoSelect from 'components/LocalizacaoSelect.vue'
  import ArmazemService from "../../../assets/js/service/armazem/ArmazemService";
  import LocalizacaoService from "../../../assets/js/service/localizacao/LocalizacaoService";
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  export default {
    name: "armazem-add",
    components: {
      toolbar,
      localizacaoSelect,
      customPage
    },
    data () {
      return {
        armazemService: null,
        localizacaoService: null,
        localizacaoOptions: [],
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
      listLocalizacao: function(){
        this.$q.loading.show();
        this.localizacaoService.listLocalizacao().then(response => {
          this.localizacaoOptions = response;
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível carragar as localizações'});
          this.$q.loading.hide();
        })
      },
      formIsValid: function(){
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
        if(this.armazem.localizacaoId.value === null || this.armazem.localizacaoId.value === ''){
          this.armazem.localizacaoId.error = true;
          this.armazem.localizacaoId.errorMessage = 'informe a localização';
          return false
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
        if( !this.formIsValid() ){
          return
        }
        let params = {
          nome: this.armazem.nome.value,
          localizacao_id: this.armazem.localizacaoId.value,
        };
        this.$q.loading.show();
        this.armazemService.addArmazem(params).then(() => {
          this.$q.notify({type: 'positive', message: 'Armazém adicionado com sucesso.'});
          this.$q.loading.hide();
          this.backAction();
        }).catch(error =>{
          console.log(error);
          this.$q.loading.show();
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o armazém'})
        })
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      new AccountRepository().getFirst().then(account => {
        this.armazemService = new ArmazemService(account.produtor_id);
        this.localizacaoService = new LocalizacaoService(account.produtor_id);
        this.listLocalizacao();
      });
    },
  }
</script>

<style scoped>
</style>
