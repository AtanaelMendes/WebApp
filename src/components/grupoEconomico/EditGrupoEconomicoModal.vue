<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal" :content-css="{minWidth: '300px', minHeight:'250px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Editar Grupo Econômico
      </div>

      <div class="row q-pa-md">
        <div class="col-12" @keyup.enter="updateGrupoEconomico()">

          <q-field :error="grupoEconomico.nome.error" :error-label="grupoEconomico.nome.errorMessage">
            <q-input v-model="grupoEconomico.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

        </div>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="updateGrupoEconomico"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import GrupoEconomicoService from "assets/js/service/GrupoEconomicoService";
  export default {
    name: "edit-grupo-economico-modal",
    data(){
      return {
        isModalOpened: false,
        selectedGrupoEconomicoId: null,
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
      openModal: function(id){
        this.isModalOpened = true;
        this.selectedGrupoEconomicoId = id;
        this.getGrupoEconomicoById(id)
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      clearFields: function(){
        this.grupoEconomico.nome.value = null;
        this.grupoEconomico.nome.error = false;
        this.grupoEconomico.nome.errorMessage = null;
      },
      getGrupoEconomicoById: function(id){
        this.$q.loading.show();
        this.grupoEconomicoService.getGrupoEconomicoById(id).then(response => {
          this.$q.loading.hide();
          this.fillFormEditGrupoEconomico(response);
        }).catch(error =>{
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações'})
        })
      },
      fillFormEditGrupoEconomico: function(data){
        this.grupoEconomico.nome.value = data.nome;
      },
      clearErrorMessage: function(){
        this.grupoEconomico.nome.errorMessage = null;
        this.grupoEconomico.nome.error = false;
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
      updateGrupoEconomico: function(){
        if( !this.formIsValid() ){
          return
        }
        let params = {
          nome: this.grupoEconomico.nome.value,
        };
        this.$q.loading.show();
        this.grupoEconomicoService.updateGrupoEconomico(this.selectedGrupoEconomicoId, params).then(() => {
          this.$q.notify({type: 'positive', message: 'Grupo econômico alterado com sucesso.'});
          this.$q.loading.hide();
          this.$root.$emit('refreshGruposEconomicosList');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          console.log(error);
          this.$q.loading.show();
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar as alterações'})
        })
      },
    }
  }
</script>

<style scoped>

</style>
