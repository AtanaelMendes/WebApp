<template>
  <q-modal key="addGrupoEconomico" v-model="isModalOpened" maximized @hide="closeModal">

    <div class="row justify-center items-center q-px-md" style="min-height: 80vh">

      <div class="col-12 text-center q-display-1">
        Novo Grupo Econômico
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" @keyup.enter="addGrupoEconomico()">

        <q-field class="q-mb-sm" :error="grupoEconomico.nome.error" :error-label="grupoEconomico.nome.errorMessage">
          <q-input v-model="grupoEconomico.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
        </q-field>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="salvar" color="primary" @click="addGrupoEconomico"/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import GrupoEconomicoService from "assets/js/service/GrupoEconomicoService";
  export default {
    name: "add-grupo-economico-modal",
    data () {
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
    },
  }
</script>
<style scoped>
</style>
