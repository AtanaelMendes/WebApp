<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalItemNve">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de NVE do Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de NVE do Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalItemNve.nve" stack-label="nve" ref="primeiroCampo"/>
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
  import NotaFiscalItemNveService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemNveService";
  export default {

    name: "notaFiscalItemNveFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemNveService: new NotaFiscalItemNveService(),
        notaFiscalItemNve: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItemNve();
    },

    props: {
      notaFiscalItemNveId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItemNve.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalItemNve(notaFiscalItemId){
        this.notaFiscalItemNve = {
          nota_fiscal_item_id: notaFiscalItemId,
          nve: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscalItemNve(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItemNve) {
        this.notaFiscalItemNve = Object.assign({}, notaFiscalItemNve);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItemNve) {
        this.notaFiscalItemNve = Object.assign({}, notaFiscalItemNve);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações de NVE deste item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItemNve()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItemNve();
        }
        return this.createNotaFiscalItemNve();
      },

      // criar
      createNotaFiscalItemNve: function(){
        this.$q.loading.show();
        this.notaFiscalItemNveService.create(this.notaFiscalItemNve).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de NVE do item adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalItemNve: function(){
        this.$q.loading.show();
        this.notaFiscalItemNveService.update(this.notaFiscalItemNve.id, this.notaFiscalItemNve).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de NVE do item atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItemNve: function(){
        this.$q.loading.show();
        this.notaFiscalItemNveService.delete(this.notaFiscalItemNve.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de NVE do item excluídas com sucesso!'});
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
