<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalAutorizado">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Adicionar Autorizado
          </template>
          <template v-if="editionType === 'edit'">
            Editar Autorizado
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalAutorizado.pessoa_id" stack-label="pessoa_id"/>
              <q-input v-model="notaFiscalAutorizado.cnpj" stack-label="cnpj" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalAutorizado.cpf" stack-label="cpf"/>
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
  import NotaFiscalAutorizadoService from "../../../../assets/js/service/notaFiscal/NotaFiscalAutorizadoService";
  export default {

    name: "notaFiscalAutorizadoFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalAutorizadoService: new NotaFiscalAutorizadoService(),
        notaFiscalAutorizado: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalAutorizado();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalAutorizado.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalAutorizado(){
        this.notaFiscalAutorizado = {
          nota_fiscal_id: this.notaFiscalId,
          pessoa_id: null,
          cnpj: null,
          cpf: null,
        }
      },

      add: function() {
        this.newNotaFiscalAutorizado();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalAutorizado) {
        this.notaFiscalAutorizado = Object.assign({}, notaFiscalAutorizado);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalAutorizado) {
        this.notaFiscalAutorizado = Object.assign({}, notaFiscalAutorizado);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este Autorizado?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalAutorizado()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalAutorizado();
        }
        return this.createNotaFiscalAutorizado();
      },

      // criar
      createNotaFiscalAutorizado: function(){
        this.$q.loading.show();
        this.notaFiscalAutorizadoService.create(this.notaFiscalAutorizado).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Autorizado adicionado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalAutorizado: function(){
        this.$q.loading.show();
        this.notaFiscalAutorizadoService.update(this.notaFiscalAutorizado.id, this.notaFiscalAutorizado).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Autorizado atualizado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalAutorizado: function(){
        this.$q.loading.show();
        this.notaFiscalAutorizadoService.delete(this.notaFiscalAutorizado.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Autorizado excluído com sucesso!'});
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
