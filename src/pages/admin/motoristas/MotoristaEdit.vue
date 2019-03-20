<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Editar motorista" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" @keyup.enter.prevent.default="updateMotorista()">

          <q-field class="q-mb-sm" :error="motorista.nome.error" :error-label="motorista.nome.errorMessage">
            <q-input v-model="motorista.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" align="end">
        <q-btn label="Salvar" color="primary" @click.native="updateMotorista()"/>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import MotoristaService from "../../../assets/js/service/motorista/MotoristaService";
  export default {
    name: "motorista-update",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        motoristaService: new MotoristaService(),
        motoristaId: this.$route.params.id,
        motorista: {
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
        if(this.motorista.nome.value === null || this.motorista.nome.value === ''){
          this.motorista.nome.error = true;
          this.motorista.nome.errorMessage = 'informe o nome do motorista';
          return false
        }
        if( this.motorista.nome.value != null){
          if(this.motorista.nome.value.length < 3){
            this.motorista.nome.error = true;
            this.motorista.nome.errorMessage = 'nome muito curto';
            return false
          }
          if(this.motorista.nome.value.length > 50){
            this.motorista.nome.error = true;
            this.motorista.nome.errorMessage = 'nome muito longo max 50 caracteres';
            return false
          }
        }
        return true
      },
      clearErrorMessage: function(){
        this.motorista.nome.errorMessage = null;
        this.motorista.nome.error = false;
      },
      getMotoristaById: function(id){
        this.$q.loading.show();
        this.motoristaService.getMotoristaById(id).then(motorista => {
          this.fillMotoristaForm(motorista);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível recuperar as informações'});
          this.$q.loading.hide();
          this.backAction()
        })
      },
      fillMotoristaForm: function(driver){
        this.motorista.nome.value = driver.nome;
      },
      updateMotorista: function(){
        if( !this.nomeIsValid() ){
          return
        }
        let params = {
          nome : this.motorista.nome.value
        };
        this.$q.loading.show();
        this.motoristaService.updateMotorista(this.motoristaId, params).then(() => {
          this.$q.notify({type: 'positive', message: 'Motorista alterado com sucesso.'});
          this.$q.loading.hide();
          this.backAction();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível fazer as alterações'})
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.getMotoristaById(this.$route.params.id)
    },
  }
</script>

<style scoped>
</style>
