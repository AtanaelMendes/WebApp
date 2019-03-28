<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal" :content-css="{minWidth: '300px', minHeight:'250px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Editar Motorista
      </div>

      <div class="row q-pa-md">
        <div class="col-12" @keyup.enter="updateMotorista()">

          <q-field :error="motorista.nome.error" :error-label="motorista.nome.errorMessage">
            <q-input v-model="motorista.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

        </div>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="updateMotorista"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import MotoristaService from "assets/js/service/motorista/MotoristaService";
  export default {
    name: "add-motorista-modal",
    data(){
      return {
        isModalOpened: false,
        selectMotoristaId: null,
        motoristaService: new MotoristaService(),
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
      openModal: function(id){
        this.isModalOpened = true;
        this.selectMotoristaId = id;
        this.getMotoristaById(id);
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
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
          this.$q.loading.hide();
          this.fillMotoristaForm(motorista);
        }).catch(error =>{
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível recuperar as informações'});
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
        this.motoristaService.updateMotorista(this.selectMotoristaId, params).then(() => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Motorista alterado com sucesso.'});
          this.$root.$emit('refreshMotoristasList');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível fazer as alterações'})
        })
      },
      clearFields: function(){
        this.motorista.nome.value = null;
        this.motorista.nome.error = false;
        this.motorista.nome.errorMessage = null;
      },
    }
  }
</script>

<style scoped>

</style>
