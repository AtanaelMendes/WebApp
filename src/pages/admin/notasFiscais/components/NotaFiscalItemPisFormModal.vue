<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalItemPis">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de PIS do Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de PIS do Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalItemPis.cst" float-label="cst" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalItemPis.base_calculo" float-label="base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.percentual" float-label="percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.valor" float-label="valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.produto_base_calculo" float-label="produto_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.produto_aliquota" float-label="produto_aliquota" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.st_base_calculo" float-label="st_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.st_percentual" float-label="st_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.st_valor" float-label="st_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.st_produto_base_calculo" float-label="st_produto_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemPis.st_produto_aliquota" float-label="st_produto_aliquota" align="right" type="number"/>

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
  import NotaFiscalItemPisService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemPisService";
  export default {

    name: "notaFiscalItemPisFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemPisService: new NotaFiscalItemPisService(),
        notaFiscalItemPis: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItemPis();
    },

    props: {
      notaFiscalItemPisId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItemPis.id) {
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
      newNotaFiscalItemPis(notaFiscalItemId){
        this.notaFiscalItemPis = {
          nota_fiscal_item_id: notaFiscalItemId,
          cst: null,
          base_calculo: null,
          percentual: null,
          valor: null,
          produto_base_calculo: null,
          produto_aliquota: null,
          st_base_calculo: null,
          st_percentual: null,
          st_valor: null,
          st_produto_base_calculo: null,
          st_produto_aliquota: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscalItemPis(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItemPis) {
        this.notaFiscalItemPis = Object.assign({}, notaFiscalItemPis);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItemPis) {
        this.notaFiscalItemPis = Object.assign({}, notaFiscalItemPis);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações de PIS deste item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItemPis()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItemPis();
        }
        return this.createNotaFiscalItemPis();
      },

      // criar
      createNotaFiscalItemPis: function(){
        this.$q.loading.show();
        this.notaFiscalItemPisService.create(this.notaFiscalItemPis).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de PIS do item adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalItemPis: function(){
        this.$q.loading.show();
        this.notaFiscalItemPisService.update(this.notaFiscalItemPis.id, this.notaFiscalItemPis).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de PIS do item atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItemPis: function(){
        this.$q.loading.show();
        this.notaFiscalItemPisService.delete(this.notaFiscalItemPis.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de PIS do item excluídas com sucesso!'});
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
