<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalItem">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
            <div class="col-12">
              <form v-on:submit.prevent="save"><input type="submit" hidden />
                <q-input v-model="notaFiscalItem.codigo" stack-label="codigo" ref="primeiroCampo"/>
                <q-input v-model="notaFiscalItem.barras" stack-label="barras"/>
                <q-input v-model="notaFiscalItem.produto" stack-label="produto"/>
                <q-input v-model="notaFiscalItem.cfop_id" stack-label="cfop_id" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.is_totalizador" stack-label="is_totalizador"/>
                <q-input v-model="notaFiscalItem.quantidade" stack-label="quantidade" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.unidade_medida_id" stack-label="unidade_medida_id" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.valor_unitario" stack-label="valor_unitario" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.entrega_negocio_id" stack-label="entrega_negocio_id" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.negocio_cultura_movimento_id" stack-label="negocio_cultura_movimento_id"/>
                <q-input v-model="notaFiscalItem.valor_produto" stack-label="valor_produto" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.valor_frete" stack-label="valor_frete" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.valor_seguro" stack-label="valor_seguro" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.valor_outro" stack-label="valor_outro" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.valor_desconto" stack-label="valor_desconto" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.produto_barra_id" stack-label="produto_barra_id" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.ncm" stack-label="ncm"/>
                <q-input v-model="notaFiscalItem.beneficio_fiscal" stack-label="beneficio_fiscal"/>
                <q-input v-model="notaFiscalItem.excecao_tabela_ipi" stack-label="excecao_tabela_ipi"/>
                <q-input v-model="notaFiscalItem.pedido" stack-label="pedido"/>
                <q-input v-model="notaFiscalItem.pedido_item" stack-label="pedido_item"/>
                <q-input v-model="notaFiscalItem.ficha_conteudo_importacao" stack-label="ficha_conteudo_importacao"/>
                <q-input v-model="notaFiscalItem.barras_tributacao" stack-label="barras_tributacao"/>
                <q-input v-model="notaFiscalItem.unidade_medida_tributacao_id" stack-label="unidade_medida_tributacao_id" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.quantidade_tributacao" stack-label="quantidade_tributacao"/>
                <q-input v-model="notaFiscalItem.valor_unitario_tributacao" stack-label="valor_unitario_tributacao" align="right" type="number"/>
                <q-input v-model="notaFiscalItem.informacoes_adicionais" stack-label="informacoes_adicionais"/>
                <q-input v-model="notaFiscalItem.cest" stack-label="cest"/>
                <q-input v-model="notaFiscalItem.escala_relevante" stack-label="escala_relevante"/>
                <q-input v-model="notaFiscalItem.cnpj_fabricante" stack-label="cnpj_fabricante"/>
                <q-input v-model="notaFiscalItem.valor_total_tributos" stack-label="valor_total_tributos"/>
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
  import NotaFiscalItemService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemService";
  export default {

    name: "NotaFiscalItemForm",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemService: new NotaFiscalItemService(),
        notaFiscalItem: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItem();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItem.id) {
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
      newNotaFiscalItem(){
        this.notaFiscalItem = {
          nota_fiscal_id: this.notaFiscalId,
          cfop_id: null,
          quantidade: null,
          unidade_medida_id: null,
          valor_unitario: null,
          entrega_negocio_id: null,
          negocio_cultura_movimento_id: null,
          valor_produto: null,
          valor_frete: null,
          valor_seguro: null,
          valor_outro: null,
          valor_desconto: null,
          produto_barra_id: null,
          codigo: null,
          barras: null,
          produto: null,
          ncm: null,
          beneficio_fiscal: null,
          excecao_tabela_ipi: null,
          is_totalizador: 1,
          pedido: null,
          pedido_item: null,
          ficha_conteudo_importacao: null,
          barras_tributacao: null,
          unidade_medida_tributacao_id: null,
          quantidade_tributacao: null,
          valor_unitario_tributacao: null,
          informacoes_adicionais: null,
          cest: null,
          escala_relevante: null,
          cnpj_fabricante: null,
          valor_total_tributos: null,
        }
      },

      add: function() {
        this.newNotaFiscalItem();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItem) {
        this.notaFiscalItem = Object.assign({}, notaFiscalItem);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItem) {
        this.notaFiscalItem = Object.assign({}, notaFiscalItem);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItem()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItem();
        }
        return this.createNotaFiscalItem();
      },

      // criar
      createNotaFiscalItem: function(){
        this.$q.loading.show();
        this.notaFiscalItemService.create(this.notaFiscalItem).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Item adicionado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalItem: function(){
        this.$q.loading.show();
        this.notaFiscalItemService.update(this.notaFiscalItem.id, this.notaFiscalItem).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Item atualizado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItem: function(){
        this.$q.loading.show();
        this.notaFiscalItemService.delete(this.notaFiscalItem.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Item excluído com sucesso!'});
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
