<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscalTransporteVolumeLacre">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Adicionar Lacre ao Volume
          </template>
          <template v-if="editionType === 'edit'">
            Editar Lacre do Volume
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalTransporteVolumeLacre.numero" float-label="numero"/>
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
  import NotaFiscalTransporteVolumeLacreService from "../../../../assets/js/service/notaFiscal/NotaFiscalTransporteVolumeLacreService";
  export default {

    name: "notaFiscalTransporteVolumeLacreFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalTransporteVolumeLacreService: new NotaFiscalTransporteVolumeLacreService(),
        notaFiscalTransporteVolumeLacre: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalTransporteVolumeLacre();
    },

    props: {
      notaFiscalTransporteVolumeLacreId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalTransporteVolumeLacre.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalTransporteVolumeLacre(notaFiscalTransporteVolumeId){
        this.notaFiscalTransporteVolumeLacre = {
          nota_fiscal_transporte_volume_id: notaFiscalTransporteVolumeId,
          numero: null,
        }
      },

      add: function(notaFiscalTransporteVolumeId) {
        this.newNotaFiscalTransporteVolumeLacre(notaFiscalTransporteVolumeId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalTransporteVolumeLacre) {
        this.notaFiscalTransporteVolumeLacre = Object.assign({}, notaFiscalTransporteVolumeLacre);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalTransporteVolumeLacre) {
        this.notaFiscalTransporteVolumeLacre = Object.assign({}, notaFiscalTransporteVolumeLacre);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações do Lacre do Volume?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalTransporteVolumeLacre()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalTransporteVolumeLacre();
        }
        return this.createNotaFiscalTransporteVolumeLacre();
      },

      // criar
      createNotaFiscalTransporteVolumeLacre: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteVolumeLacreService.create(this.notaFiscalTransporteVolumeLacre).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Lacre do Volume adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalTransporteVolumeLacre: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteVolumeLacreService.update(this.notaFiscalTransporteVolumeLacre.id, this.notaFiscalTransporteVolumeLacre).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações do Lacre do Volume atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalTransporteVolumeLacre: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteVolumeLacreService.delete(this.notaFiscalTransporteVolumeLacre.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações do Lacre do Volume excluídas com sucesso!'});
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
