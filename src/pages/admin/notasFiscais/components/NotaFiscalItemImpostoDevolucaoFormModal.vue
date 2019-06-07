<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalItemImpostoDevolucao">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de Imposto Devolução do Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de Imposto Devolução do Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalItemImpostoDevolucao.percentual" stack-label="percentual" align="right" type="number" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalItemImpostoDevolucao.ipi_valor" stack-label="ipi_valor" align="right" type="number"/>

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
  import NotaFiscalItemImpostoDevolucaoService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemImpostoDevolucaoService";
  export default {

    name: "notaFiscalItemImpostoDevolucaoFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemImpostoDevolucaoService: new NotaFiscalItemImpostoDevolucaoService(),
        notaFiscalItemImpostoDevolucao: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItemImpostoDevolucao();
    },

    props: {
      notaFiscalItemImpostoDevolucaoId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItemImpostoDevolucao.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalItemImpostoDevolucao(notaFiscalItemId){
        this.notaFiscalItemImpostoDevolucao = {
          nota_fiscal_item_id: notaFiscalItemId,
          percentual: null,
          ipi_valor: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscalItemImpostoDevolucao(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItemImpostoDevolucao) {
        this.notaFiscalItemImpostoDevolucao = Object.assign({}, notaFiscalItemImpostoDevolucao);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItemImpostoDevolucao) {
        this.notaFiscalItemImpostoDevolucao = Object.assign({}, notaFiscalItemImpostoDevolucao);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações de IPI deste item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItemImpostoDevolucao()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItemImpostoDevolucao();
        }
        return this.createNotaFiscalItemImpostoDevolucao();
      },

      // criar
      createNotaFiscalItemImpostoDevolucao: function(){
        this.$q.loading.show();
        this.notaFiscalItemImpostoDevolucaoService.create(this.notaFiscalItemImpostoDevolucao).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de IPI do item adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalItemImpostoDevolucao: function(){
        this.$q.loading.show();
        this.notaFiscalItemImpostoDevolucaoService.update(this.notaFiscalItemImpostoDevolucao.id, this.notaFiscalItemImpostoDevolucao).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Imposto Devolução do item atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItemImpostoDevolucao: function(){
        this.$q.loading.show();
        this.notaFiscalItemImpostoDevolucaoService.delete(this.notaFiscalItemImpostoDevolucao.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Imposto Devolução do item excluídas com sucesso!'});
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
