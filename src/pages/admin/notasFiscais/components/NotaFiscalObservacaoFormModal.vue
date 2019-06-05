<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscalObservacao">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Informar Observação
          </template>
          <template v-if="editionType === 'edit'">
            Editar Observação
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalObservacao.is_fisco" float-label="is_fisco"/>
              <q-input v-model="notaFiscalObservacao.campo" float-label="campo"/>
              <q-input v-model="notaFiscalObservacao.texto" float-label="texto"/>
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
  import NotaFiscalObservacaoService from "../../../../assets/js/service/notaFiscal/NotaFiscalObservacaoService";
  export default {

    name: "notaFiscalObservacaoFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalObservacaoService: new NotaFiscalObservacaoService(),
        notaFiscalObservacao: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalObservacao();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalObservacao.id) {
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
      newNotaFiscalObservacao(){
        this.notaFiscalObservacao = {
          nota_fiscal_id: this.notaFiscalId,
          is_fisco: null,
          campo: null,
          texto: null,
        }
      },

      add: function() {
        this.newNotaFiscalObservacao();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalObservacao) {
        this.notaFiscalObservacao = Object.assign({}, notaFiscalObservacao);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalObservacao) {
        this.notaFiscalObservacao = Object.assign({}, notaFiscalObservacao);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta Observação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deletenotaFiscalObservacao()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updatenotaFiscalObservacao();
        }
        return this.createnotaFiscalObservacao();
      },

      // criar
      createnotaFiscalObservacao: function(){
        this.$q.loading.show();
        this.notaFiscalObservacaoService.create(this.notaFiscalObservacao).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Observação adicionada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updatenotaFiscalObservacao: function(){
        this.$q.loading.show();
        this.notaFiscalObservacaoService.update(this.notaFiscalObservacao.id, this.notaFiscalObservacao).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Observação atualizada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deletenotaFiscalObservacao: function(){
        this.$q.loading.show();
        this.notaFiscalObservacaoService.delete(this.notaFiscalObservacao.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Observação excluída com sucesso!'});
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
