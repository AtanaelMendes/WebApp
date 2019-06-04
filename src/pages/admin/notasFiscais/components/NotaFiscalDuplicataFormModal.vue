<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscalDuplicata">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Informar Duplicata
          </template>
          <template v-if="editionType === 'edit'">
            Editar Duplicata
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalDuplicata.numero" float-label="numero"/>
              <q-input v-model="notaFiscalDuplicata.vencimento" float-label="vencimento"/>
              <q-input v-model="notaFiscalDuplicata.valor" float-label="valor"/>
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
  import NotaFiscalDuplicataService from "../../../../assets/js/service/notaFiscal/NotaFiscalDuplicataService";
  export default {

    name: "notaFiscalDuplicataFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalDuplicataService: new NotaFiscalDuplicataService(),
        notaFiscalDuplicata: {}
      }
    },

    mounted:function (){
      this.newnotaFiscalDuplicata();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalDuplicata.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {

      teste() {
        console.log('aqui');
      },

      // limpa dados do formulario
      newnotaFiscalDuplicata(){
        this.notaFiscalDuplicata = {
          nota_fiscal_id: this.notaFiscalId,
          numero: null,
          vencimento: null,
          valor: null,
        }
      },

      add: function() {
        this.newnotaFiscalDuplicata();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalDuplicata) {
        this.notaFiscalDuplicata = Object.assign({}, notaFiscalDuplicata);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalDuplicata) {
        this.notaFiscalDuplicata = Object.assign({}, notaFiscalDuplicata);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta Duplicata?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deletenotaFiscalDuplicata()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updatenotaFiscalDuplicata();
        }
        return this.createnotaFiscalDuplicata();
      },

      // criar
      createnotaFiscalDuplicata: function(){
        this.$q.loading.show();
        this.notaFiscalDuplicataService.create(this.notaFiscalDuplicata).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Duplicata adicionada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updatenotaFiscalDuplicata: function(){
        this.$q.loading.show();
        this.notaFiscalDuplicataService.update(this.notaFiscalDuplicata.id, this.notaFiscalDuplicata).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Duplicata atualizada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deletenotaFiscalDuplicata: function(){
        this.$q.loading.show();
        this.notaFiscalDuplicataService.delete(this.notaFiscalDuplicata.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Duplicata excluída com sucesso!'});
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
