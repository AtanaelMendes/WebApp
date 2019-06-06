<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalItemCofins">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de Cofins do Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de Cofins do Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
            <div class="col-12">
              <form v-on:submit.prevent="save"><input type="submit" hidden />
                <q-input v-model="notaFiscalItemCofins.cst" float-label="cst" ref="primeiroCampo"/>
                <q-input v-model="notaFiscalItemCofins.base_calculo" float-label="base_calculo" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.percentual" float-label="percentual" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.valor" float-label="valor" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.produto_base_calculo" float-label="produto_base_calculo" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.produto_aliquota" float-label="produto_aliquota" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.st_base_calculo" float-label="st_base_calculo" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.st_percentual" float-label="st_percentual" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.st_valor" float-label="st_valor"/>
                <q-input v-model="notaFiscalItemCofins.st_produto_base_calculo" float-label="st_produto_base_calculo" align="right" type="number"/>
                <q-input v-model="notaFiscalItemCofins.st_produto_aliquota" float-label="st_produto_aliquota" align="right" type="number"/>
              </form>
            </div>
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
  import NotaFiscalItemCofinsService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemCofinsService";
  export default {

    name: "notaFiscalItemCofinsFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemCofinsService: new NotaFiscalItemCofinsService(),
        notaFiscalItemCofins: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItemCofins();
    },

    props: {
      notaFiscalItemCofinsId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItemCofins.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {

      // limpa dados do formulario
      newNotaFiscalItemCofins(notaFiscalItemId){
        this.notaFiscalItemCofins = {
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
          created_at: null,
          updated_at: null,
          deleted_at: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscalItemCofins(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItemCofins) {
        this.notaFiscalItemCofins = Object.assign({}, notaFiscalItemCofins);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItemCofins) {
        this.notaFiscalItemCofins = Object.assign({}, notaFiscalItemCofins);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações de Cofins deste item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItemCofins()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItemCofins();
        }
        return this.createNotaFiscalItemCofins();
      },

      // criar
      createNotaFiscalItemCofins: function(){
        this.$q.loading.show();
        this.notaFiscalItemCofinsService.create(this.notaFiscalItemCofins).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Cofins do item adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalItemCofins: function(){
        this.$q.loading.show();
        this.notaFiscalItemCofinsService.update(this.notaFiscalItemCofins.id, this.notaFiscalItemCofins).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Cofins do item atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItemCofins: function(){
        this.$q.loading.show();
        this.notaFiscalItemCofinsService.delete(this.notaFiscalItemCofins.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Cofins do item excluidas com sucesso!'});
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
