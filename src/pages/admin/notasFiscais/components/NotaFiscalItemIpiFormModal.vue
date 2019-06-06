<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalItemIpi">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de IPI do Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de IPI do Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalItemIpi.cst" float-label="cst" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalItemIpi.base_calculo" float-label="base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIpi.percentual" float-label="percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIpi.valor" float-label="valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIpi.cnpj_produtor" float-label="cnpj_produtor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIpi.codigo_selo" float-label="codigo_selo"/>
              <q-input v-model="notaFiscalItemIpi.quantidade_selo" float-label="quantidade_selo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIpi.codigo_enquadramento" float-label="codigo_enquadramento"/>
              <q-input v-model="notaFiscalItemIpi.quantidade_unidade" float-label="quantidade_unidade" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIpi.valor_unidade" float-label="valor_unidade" align="right" type="number"/>
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
  import NotaFiscalItemIpiService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemIpiService";
  export default {

    name: "notaFiscalItemIpiFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemIpiService: new NotaFiscalItemIpiService(),
        notaFiscalItemIpi: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItemIpi();
    },

    props: {
      notaFiscalItemIpiId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItemIpi.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalItemIpi(notaFiscalItemId){
        this.notaFiscalItemIpi = {
          nota_fiscal_item_id: notaFiscalItemId,
          cst: null,
          base_calculo: null,
          percentual: null,
          valor: null,
          cnpj_produtor: null,
          codigo_selo: null,
          quantidade_selo: null,
          codigo_enquadramento: null,
          quantidade_unidade: null,
          valor_unidade: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscalItemIpi(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItemIpi) {
        this.notaFiscalItemIpi = Object.assign({}, notaFiscalItemIpi);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItemIpi) {
        this.notaFiscalItemIpi = Object.assign({}, notaFiscalItemIpi);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações de IPI deste item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItemIpi()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItemIpi();
        }
        return this.createNotaFiscalItemIpi();
      },

      // criar
      createNotaFiscalItemIpi: function(){
        this.$q.loading.show();
        this.notaFiscalItemIpiService.create(this.notaFiscalItemIpi).then((response) => {
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
      updateNotaFiscalItemIpi: function(){
        this.$q.loading.show();
        this.notaFiscalItemIpiService.update(this.notaFiscalItemIpi.id, this.notaFiscalItemIpi).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de IPI do item atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItemIpi: function(){
        this.$q.loading.show();
        this.notaFiscalItemIpiService.delete(this.notaFiscalItemIpi.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de IPI do item excluídas com sucesso!'});
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
