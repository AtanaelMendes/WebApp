<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscalTransporte">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Informar Transporte
          </template>
          <template v-if="editionType === 'edit'">
            Editar Transporte
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalTransporte.localizacao_id" float-label="localizacao_id"/>
              <q-input v-model="notaFiscalTransporte.razao_social" float-label="razao_social"/>
              <q-input v-model="notaFiscalTransporte.inscricao_estadual" float-label="inscricao_estadual"/>
              <q-input v-model="notaFiscalTransporte.cnpj" float-label="cnpj"/>
              <q-input v-model="notaFiscalTransporte.cpf" float-label="cpf"/>
              <q-input v-model="notaFiscalTransporte.endereco" float-label="endereco"/>
              <q-input v-model="notaFiscalTransporte.cidade_id" float-label="cidade_id"/>
              <q-input v-model="notaFiscalTransporte.retencao_valor_servico" float-label="retencao_valor_servico"/>
              <q-input v-model="notaFiscalTransporte.retencao_base_calculo" float-label="retencao_base_calculo"/>
              <q-input v-model="notaFiscalTransporte.retencao_percentual" float-label="retencao_percentual"/>
              <q-input v-model="notaFiscalTransporte.retencao_valor" float-label="retencao_valor"/>
              <q-input v-model="notaFiscalTransporte.retencao_cfop_id" float-label="retencao_cfop_id"/>
              <q-input v-model="notaFiscalTransporte.retencao_cidade_id" float-label="retencao_cidade_id"/>
              <q-input v-model="notaFiscalTransporte.caminhao_id" float-label="caminhao_id"/>
              <q-input v-model="notaFiscalTransporte.caminhao_placa" float-label="caminhao_placa"/>
              <q-input v-model="notaFiscalTransporte.caminhao_estado_id" float-label="caminhao_estado_id"/>
              <q-input v-model="notaFiscalTransporte.caminhao_antt" float-label="caminhao_antt"/>
              <q-input v-model="notaFiscalTransporte.vagao" float-label="vagao"/>
              <q-input v-model="notaFiscalTransporte.balsa" float-label="balsa"/>
            </form>
          </div>
        </div>
      </div>
      <div class="q-pa-sm text-right" slot="footer">
        <q-btn flat label="cancelar" color="negative" @click="close" class="q-mr-sm"/>
        <q-btn flat label="Salvar"   color="primary"  @click="save"  key="edit"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import NotaFiscalTransporteService from "../../../../assets/js/service/notaFiscal/NotaFiscalTransporteService";
  export default {

    name: "notaFiscalTransporteFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalTransporteService: new NotaFiscalTransporteService(),
        notaFiscalTransporte: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalTransporte();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalTransporte.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalTransporte(){
        this.notaFiscalTransporte = {
          nota_fiscal_id: this.notaFiscalId,
          localizacao_id: null,
          razao_social: null,
          inscricao_estadual: null,
          cnpj: null,
          cpf: null,
          endereco: null,
          cidade_id: null,
          retencao_valor_servico: null,
          retencao_base_calculo: null,
          retencao_percentual: null,
          retencao_valor: null,
          retencao_cfop_id: null,
          retencao_cidade_id: null,
          caminhao_id: null,
          caminhao_placa: null,
          caminhao_estado_id: null,
          caminhao_antt: null,
          vagao: null,
          balsa: null,
        }
      },

      add: function() {
        this.newNotaFiscalTransporte();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalTransporte) {
        this.notaFiscalTransporte = Object.assign({}, notaFiscalTransporte);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalTransporte) {
        this.notaFiscalTransporte = Object.assign({}, notaFiscalTransporte);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este Transporte?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deletenotaFiscalTransporte()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updatenotaFiscalTransporte();
        }
        return this.createnotaFiscalTransporte();
      },

      // criar
      createnotaFiscalTransporte: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteService.create(this.notaFiscalTransporte).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Transporte adicionado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updatenotaFiscalTransporte: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteService.update(this.notaFiscalTransporte.id, this.notaFiscalTransporte).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Transporte atualizado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deletenotaFiscalTransporte: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteService.delete(this.notaFiscalTransporte.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Transporte excluído com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

    }
  }
</script>

<style scoped>

</style>
