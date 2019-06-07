<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal" :content-css="{minWidth: '300px', minHeight:'250px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Editar Caminhão
      </div>

      <div class="row q-pa-md">
        <div class="col-12" @keyup.enter="updateCaminhao()">

          <q-field class="q-mb-sm" :error="caminhao.nome.error" :error-label="caminhao.nome.errorMessage">
            <q-input v-model="caminhao.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

          <q-field class="q-mb-sm" :error="caminhao.placa.error" :error-label="caminhao.placa.errorMessage">
            <q-input upper-case	 v-model="caminhao.placa.value" float-label="Placa" @input="clearErrorMessage()" maxlength="7"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.tara" float-label="Tara" type="number"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.pesoBruto" float-label="Peso bruto total" type="number"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.estimativaCarga" float-label="Estimativa da carga" type="number"/>
          </q-field>

          <q-field class="q-mb-sm" :error="caminhao.unidadeMedidaSigla.error" :error-label="caminhao.unidadeMedidaSigla.errorMessage">
            <q-select v-model="caminhao.unidadeMedidaSigla.value" float-label="Unidade medida" :options="unidadeMedidaOptions" @input="clearErrorMessage()"/>
          </q-field>

        </div>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="updateCaminhao"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import CaminhaoService from "assets/js/service/CaminhaoService";
  import UnidadeMedidaService from "assets/js/service/UnidadeMedidaService";
  export default {
    name: "add-motorista-modal",
    data(){
      return {
        isModalOpened: false,
        selectCaminhaoId: null,
        caminhaoService: new CaminhaoService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        unidadeMedidaOptions: [],
        caminhao: {
          nome: {
            value: null,
            error: false,
            errorMessage: null
          },
          placa: {
            value: null,
            error: false,
            errorMessage: null
          },
          tara: null,
          pesoBruto: null,
          estimativaCarga: null,
          unidadeMedidaSigla: {
            value: null,
            error: false,
            errorMessage: null,
          },
        },
      }
    },
    methods: {
      openModal: function(id){
        this.selectCaminhaoId = id;
        this.isModalOpened = true;
        this.getCaminhaoById(id);
        this.selectUnidadeMedida();
      },
      getCaminhaoById: function(id){
        this.$q.loading.show();
        this.caminhaoService.getCaminhaoById(id).then(caminhao => {
          this.fillFormCaminhao(caminhao);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possivel carregar as informações'})
          this.$q.loading.hide();
        })
      },
      fillFormCaminhao(caminhao){
        this.caminhao.nome.value = caminhao.nome;
        this.caminhao.placa.value = caminhao.placa;
        this.caminhao.tara = caminhao.tara;
        this.caminhao.pesoBruto = caminhao.pbt;
        this.caminhao.estimativaCarga = caminhao.estimativa_carga;
        this.caminhao.unidadeMedidaSigla.value = caminhao.unidade_medida_id;
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      clearFields: function(){
        this.caminhao.nome.value = null;
        this.caminhao.nome.error = false;
        this.caminhao.nome.errorMessage = null;
        this.caminhao.placa.value = null;
        this.caminhao.placa.error = false;
        this.caminhao.placa.errorMessage = null;
        this.caminhao.unidadeMedidaSigla.value = null;
        this.caminhao.unidadeMedidaSigla.error = false;
        this.caminhao.unidadeMedidaSigla.errorMessage = null;
        this.caminhao.tara = null;
        this.caminhao.pesoBruto = false;
        this.caminhao.estimativaCarga= null;
      },
      selectUnidadeMedida: function(){
        this.$q.loading.show();
        this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.$q.loading.hide();
          this.unidadeMedidaOptions = this.parsedUnidades(unidades);
        }).catch(error =>{
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possivel carregar as unidade de medida'});
        })
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome + ', ' + unidade.sigla,
            value: unidade.id
          }
        })
      },
      nomeIsValid: function(){
        if(this.caminhao.nome.value === null || this.caminhao.nome.value === ''){
          this.caminhao.nome.error = true;
          this.caminhao.nome.errorMessage = 'informe o nome do caminhão';
          return false
        }
        if( this.caminhao.nome.value != null){
          if(this.caminhao.nome.value.length < 3){
            this.caminhao.nome.error = true;
            this.caminhao.nome.errorMessage = 'nome muito curto';
            return false
          }
        }
        return true
      },
      placaIsValid: function(){
        if(this.caminhao.placa.value === null || this.caminhao.placa.value === ''){
          this.caminhao.placa.error = true;
          this.caminhao.placa.errorMessage = 'informe a placa do caminhão';
          return false
        }
        if(this.caminhao.placa.value != null){
          if(this.caminhao.placa.value.length != 7){
            this.caminhao.placa.error = true;
            this.caminhao.placa.errorMessage = 'a placa é inválida';
            return false
          }
        }
        return true
      },
      unidadeMedidaValid: function(){
        if(this.caminhao.unidadeMedidaSigla.value === null || this.caminhao.unidadeMedidaSigla.value === undefined){
          this.caminhao.unidadeMedidaSigla.error = true;
          this.caminhao.unidadeMedidaSigla.errorMessage = 'informe a unidade de medida';
          return false
        }
        return true
      },
      clearErrorMessage: function(){
        this.caminhao.nome.errorMessage = null;
        this.caminhao.nome.error = false;
        this.caminhao.placa.errorMessage = null;
        this.caminhao.placa.error = false;
        this.caminhao.unidadeMedidaSigla.error = false;
        this.caminhao.unidadeMedidaSigla.errorMessage = null;
      },
      updateCaminhao: function(){
        if(!this.nomeIsValid() || !this.placaIsValid() || !this.unidadeMedidaValid()){
          return
        }
        this.$q.loading.show();
        let params = {
          nome: this.caminhao.nome.value,
          placa: this.caminhao.placa.value,
          tara: this.caminhao.tara,
          pbt: this.caminhao.pesoBruto,
          estimativa_carga: this.caminhao.estimativaCarga,
          unidade_medida_id: this.caminhao.unidadeMedidaSigla.value
        };
        this.caminhaoService.updateCaminhao(this.selectCaminhaoId, params).then(() => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Caminhão adicionado com sucesso.'});
          this.$root.$emit('refreshCaminhoesList');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar as alterações'})
        })
      },
    }
  }
</script>

<style scoped>

</style>
