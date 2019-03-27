<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal" :content-css="{minWidth: '300px', minHeight:'250px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Novo Grupo Econômico
      </div>

      <div class="row q-pa-md">
        <div class="col-12" @keyup.enter="addGrupoEconomico()">

          <q-field :error="grupoEconomico.nome.error" :error-label="grupoEconomico.nome.errorMessage">
            <q-input v-model="grupoEconomico.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

        </div>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="addGrupoEconomico"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import GrupoEconomicoService from "assets/js/service/GrupoEconomicoService";
  export default {
    name: "add-grupo-economico-modal",
    data(){
      return {
        isModalOpened: false,
        grupoEconomicoService: new GrupoEconomicoService(),
        grupoEconomico: {
          nome: {
            value: null,
            error: false,
            errorMessage: null
          }
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
      clearFields: function(){
        this.grupoEconomico.nome.value = null;
        this.grupoEconomico.nome.error = false;
        this.grupoEconomico.nome.errorMessage = null;
      },
      formIsValid: function(){
        if(this.grupoEconomico.nome.value === null || this.grupoEconomico.nome.value === ''){
          this.grupoEconomico.nome.error = true;
          this.grupoEconomico.nome.errorMessage = 'informe o nome do grupo econômico';
          return false
        }
        if( this.grupoEconomico.nome.value != null){
          if(this.grupoEconomico.nome.value.length < 3){
            this.grupoEconomico.nome.error = true;
            this.grupoEconomico.nome.errorMessage = 'nome muito curto min 3 caracteres';
            return false
          }
        }
        return true
      },
      clearErrorMessage: function(){
        this.grupoEconomico.nome.errorMessage = null;
        this.grupoEconomico.nome.error = false;
      },
      addGrupoEconomico: function(){
        if( !this.formIsValid() ){
          return
        }
        let params = {
          nome: this.grupoEconomico.nome.value,
        };
        this.$q.loading.show();
        this.grupoEconomicoService.saveGrupoEconomico(params).then(() => {
          this.$q.notify({type: 'positive', message: 'Grupo econômico adicionado com sucesso.'});
          this.$q.loading.hide();
          this.$root.$emit('refreshGruposEconomicosList');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o grupo econômico'})
        })
      },
    }
  }
</script>

<style scoped>

</style>
