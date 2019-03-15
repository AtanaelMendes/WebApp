<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Editar Armazém" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <form @keyup.enter="updateArmazem()">

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
        <q-btn label="Salvar" color="primary" @click.native="updateArmazem()"/>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import armazemService from 'assets/js/service/armazem/ArmazemService'
  import localizacaoSelect from 'components/LocalizacaoSelect.vue'
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  export default {
    name: "armazem-edit",
    components: {
      toolbar,
      localizacaoSelect,
      customPage
    },
    data () {
      return {
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
        localizacaoService.listLocalizacao().then(response => {
          this.localizacaoOptions = response;
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
      updateArmazem: function(){
        if( !this.formIsValid() ){
          return
        }
        let params = {
          nome: this.armazem.nome.value,
          localizacao_id: this.armazem.localizacaoId.value,
        };
        this.$q.loading.show();
        armazemService.updateArmazem(this.$route.params.id, params).then(response => {
          this.$q.notify({type: 'positive', message: 'Armazém atualizado com sucesso.'});
          this.$q.loading.hide();
          this.backAction();
        }).catch(error =>{
          this.$q.loading.show();
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar as alterações'})
        })
      },
      getArmazemById: function(id){
        this.$q.loading.show();
        armazemService.getArmazemById(id).then(response => {
          this.fillFormArmazem(response.data);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
          this.$q.loading.hide();
        })
      },
      fillFormArmazem: function(data){
        this.armazem.nome.value = data.nome;
        this.armazem.localizacaoId.value = data.localizacao_id;
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.getArmazemById(this.$route.params.id);
      this.listLocalizacao();
    },
  }
</script>

<style scoped>
</style>
