<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalFormaPagamento">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Informar Forma de Pagamento
          </template>
          <template v-if="editionType === 'edit'">
            Editar Forma de Pagamento
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <ap-select-type v-model="notaFiscalFormaPagamento.tipo" type="PAGAMENTO_TIPO" stack-label="Forma de Pagamento" />
              <q-input v-model="notaFiscalFormaPagamento.valor" stack-label="valor" align="right" type="number" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalFormaPagamento.is_prazo" stack-label="is_prazo"/>
              <q-input v-model="notaFiscalFormaPagamento.troco" stack-label="troco" align="right" type="number"/>
              <q-input v-model="notaFiscalFormaPagamento.fatura" stack-label="fatura"/>
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
  import apSelectType from '../../../../components/form/ApSelectType'
  import NotaFiscalFormaPagamentoService from "../../../../assets/js/service/notaFiscal/NotaFiscalFormaPagamentoService";
  export default {
    name: "notaFiscalFormaPagamentoFormModal",
    components:{
      apSelectType,
    },
    data(){
      return {
        isModalOpened: false,
        notaFiscalFormaPagamentoService: new NotaFiscalFormaPagamentoService(),
        notaFiscalFormaPagamento: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalFormaPagamento();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalFormaPagamento.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalFormaPagamento(){
        this.notaFiscalFormaPagamento = {
          nota_fiscal_id: this.notaFiscalId,
          tipo: null,
          valor: null,
          is_prazo: null,
          troco: null,
          fatura: null,
        }
      },

      add: function() {
        this.newNotaFiscalFormaPagamento();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalFormaPagamento) {
        this.notaFiscalFormaPagamento = Object.assign({}, notaFiscalFormaPagamento);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalFormaPagamento) {
        this.notaFiscalFormaPagamento = Object.assign({}, notaFiscalFormaPagamento);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta Forma de Pagamento?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalFormaPagamento()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalFormaPagamento();
        }
        return this.createNotaFiscalFormaPagamento();
      },

      // criar
      createNotaFiscalFormaPagamento: function(){
        this.$q.loading.show();
        this.notaFiscalFormaPagamentoService.create(this.notaFiscalFormaPagamento).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Forma de Pagamento salva com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalFormaPagamento: function(){
        this.$q.loading.show();
        this.notaFiscalFormaPagamentoService.update(this.notaFiscalFormaPagamento.id, this.notaFiscalFormaPagamento).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Forma de Pagamento atualizada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalFormaPagamento: function(){
        this.$q.loading.show();
        this.notaFiscalFormaPagamentoService.delete(this.notaFiscalFormaPagamento.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Forma de Pagamento excluída com sucesso!'});
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
