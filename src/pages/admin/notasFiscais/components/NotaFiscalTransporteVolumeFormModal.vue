<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalTransporteVolume">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de Transporte Volume
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de Transporte Volume
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalTransporteVolume.quantidade" stack-label="quantidade" ref="primeiroCampo" align="right" type="number"/>
              <q-input v-model="notaFiscalTransporteVolume.especie" stack-label="especie"/>
              <q-input v-model="notaFiscalTransporteVolume.marca" stack-label="marca"/>
              <q-input v-model="notaFiscalTransporteVolume.numeracao" stack-label="numeracao" align="right" />
              <q-input v-model="notaFiscalTransporteVolume.peso_bruto" stack-label="peso_bruto" align="right" type="number"/>
              <q-input v-model="notaFiscalTransporteVolume.peso_liquido" stack-label="peso_liquido" align="right" type="number"/>
            </form>
          </div>
        </div>
      </div>
      <div class="q-pa-sm text-right" slot="footer">
        <q-btn flat label="cancelar" color="negative" @click="close" class="q-mr-sm" :tabindex="-1"/>
        <q-btn flat label="Salvar"   color="primary"  @click="save"  key="edit"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import NotaFiscalTransporteVolumeService from "../../../../assets/js/service/notaFiscal/NotaFiscalTransporteVolumeService";
  export default {

    name: "notaFiscalTransporteVolumeFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalTransporteVolumeService: new NotaFiscalTransporteVolumeService(),
        notaFiscalTransporteVolume: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalTransporteVolume();
    },

    props: {
      notaFiscalTransporteVolumeId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalTransporteVolume.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalTransporteVolume(notaFiscalTransporteId){
        this.notaFiscalTransporteVolume = {
          nota_fiscal_transporte_id: notaFiscalTransporteId,
          quantidade: null,
          especie: null,
          marca: null,
          numeracao: null,
          peso_bruto: null,
          peso_liquido: null,
        }
      },

      add: function(notaFiscalTransporteId) {
        this.newNotaFiscalTransporteVolume(notaFiscalTransporteId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalTransporteVolume) {
        this.notaFiscalTransporteVolume = Object.assign({}, notaFiscalTransporteVolume);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalTransporteVolume) {
        this.notaFiscalTransporteVolume = Object.assign({}, notaFiscalTransporteVolume);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações Transporte Volume?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalTransporteVolume()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalTransporteVolume();
        }
        return this.createNotaFiscalTransporteVolume();
      },

      // criar
      createNotaFiscalTransporteVolume: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteVolumeService.create(this.notaFiscalTransporteVolume).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Transporte Volume adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalTransporteVolume: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteVolumeService.update(this.notaFiscalTransporteVolume.id, this.notaFiscalTransporteVolume).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Transporte Volume atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalTransporteVolume: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteVolumeService.delete(this.notaFiscalTransporteVolume.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Transporte Volume excluídas com sucesso!'});
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
