<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="NotaFiscalProcesso">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Adicionar Processo
          </template>
          <template v-if="editionType === 'edit'">
            Editar Processo
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="NotaFiscalProcesso.numero" float-label="numero"/>
              <q-input v-model="NotaFiscalProcesso.origem" float-label="origem"/>
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
  import NotaFiscalProcessoService from "../../../../assets/js/service/notaFiscal/NotaFiscalProcessoService";
  export default {

    name: "notaFiscalProcessoFormModal",

    data(){
      return {
        isModalOpened: false,
        NotaFiscalProcessoService: new NotaFiscalProcessoService(),
        NotaFiscalProcesso: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalProcesso();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.NotaFiscalProcesso.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalProcesso(){
        this.NotaFiscalProcesso = {
          nota_fiscal_id: this.notaFiscalId,
          numero: null,
          origem: null,
        }
      },

      add: function() {
        this.newNotaFiscalProcesso();
        this.isModalOpened = true;
      },

      edit: function(NotaFiscalProcesso) {
        this.NotaFiscalProcesso = Object.assign({}, NotaFiscalProcesso);
        this.isModalOpened = true;
      },

      delete: function(NotaFiscalProcesso) {
        this.NotaFiscalProcesso = Object.assign({}, NotaFiscalProcesso);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este Processo?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalProcesso()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalProcesso();
        }
        return this.createNotaFiscalProcesso();
      },

      // criar
      createNotaFiscalProcesso: function(){
        this.$q.loading.show();
        this.NotaFiscalProcessoService.create(this.NotaFiscalProcesso).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Processo adicionado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalProcesso: function(){
        this.$q.loading.show();
        this.NotaFiscalProcessoService.update(this.NotaFiscalProcesso.id, this.NotaFiscalProcesso).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Processo atualizado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalProcesso: function(){
        this.$q.loading.show();
        this.NotaFiscalProcessoService.delete(this.NotaFiscalProcesso.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Processo excluído com sucesso!'});
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
