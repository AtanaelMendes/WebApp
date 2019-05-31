<template>
  <q-modal v-model="isModalOpened" maximized @hide="closeModal">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header" v-if="editionType === 'add' ">
        Adicionar Item
      </div>
      <div class="q-pa-md q-title text-center" slot="header" v-if="editionType === 'edit' ">
        Editar Item
      </div>
      <div class="row q-pa-md">
        <div class="col-12 gutter-y-sm">

          <div class="row q-pa-md justify-center">

            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <q-input v-model="item.cfopId" type="number" float-label="CFOP ID"/>
              <q-input v-model="item.quantidade" type="number" float-label="Quantidade"/>
              <q-input v-model="item.unidadeMedidaId" type="number" float-label="Unidade Medida Id"/>
              <q-input v-model="item.valorUnitario" type="number" float-label="Valor Unitário"/>
              <q-input v-model="item.valorProduto" type="number" float-label="Valor Produto"/>
              <q-input v-model="item.valorFrete" type="number" float-label="Valor Frete"/>
              <q-input v-model="item.valorSeguro" type="number" float-label="Valor Seguro"/>
              <q-input v-model="item.valorOutro" type="number" float-label="Valor Outro"/>
              <q-input v-model="item.valorDesconto" type="number" float-label="Valor Desconto"/>
              <q-input v-model="item.entregaNegocioId" type="number" float-label="Entrega Negocio ID"/>
              <q-input v-model="item.negocioCulturaMovimentoId" type="number"float-label="Negocio Cultura Movimento ID"/>
              <q-input v-model="item.produtoBarraId" type="number" float-label="Produto Barra ID"/>
              <q-input v-model="item.codigo" float-label="Código"/>
              <q-input v-model="item.barras" float-label="Barras"/>
              <q-input v-model="item.produto" float-label="Produto"/>
              <q-input v-model="item.ncm" float-label="NCM"/>
              <q-input v-model="item.beneficioFiscal" float-label="Benefício FIscal"/>
              <q-input v-model="item.excecaoTabelaIpi" float-label="Exceção Tabela IPI"/>

              <!--todo esse campo e bolenano-->
              <q-input v-model="item.totalizador" type="number" float-label="Totalizador"/>

              <q-input v-model="item.pedido" float-label="Pedido"/>
              <q-input v-model="item.pedidoItem" float-label="Pedido Item"/>
              <q-input v-model="item.fichaConteudoImportacao" float-label="Ficha Conteúdo Importação"/>
              <q-input v-model="item.barrasTributacao" float-label="Barras Tributação"/>
              <q-input v-model="item.unidadeMedidaTributacaoId" type="number" float-label="Unidade Medida Tributação ID"/>
              <q-input v-model="item.quantidadeTributacao" type="number" float-label="Quantidade Tributação"/>
              <q-input v-model="item.valorUnitarioTributacao" type="number" float-label="Quantidade Tributação"/>
              <q-input v-model="item.informacoesAdicionais" float-label="Infomações Adicionais"/>
              <q-input v-model="item.cest" float-label="CEST"/>

              <!--todo esse campo e bolenano-->
              <q-input v-model="item.escalaRelevante" float-label="Escala Relevante"/>

              <q-input v-model="item.cnpjFabricante" float-label="CNPJ Fabricante"/>
              <q-input v-model="item.valorTotalTributos" type="number" float-label="Valor Total Tributos"/>
            </div>

          </div>

        </div>
      </div>
      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn key="edit" label="Atualizar" color="primary" @click="updateItem" v-if="editionType === 'edit' "/>
        <q-btn key="add" label="salvar" color="primary" @click="createItem" v-if="editionType === 'add' "/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import NotaFiscalService from "../../../../assets/js/service/NotaFiscalService";
  export default {
    name: "NotaFiscalItemForm",
    components:{
    },
    data(){
      return {
        notaFiscalService: new NotaFiscalService(),
        editionType: null,
        isModalOpened: false,
        selectedItem: null,
        item:{
          notaFiscalId: null,
          cfopId: null,
          quantidade: null,
          unidadeMedidaId: null,
          valorUnitario: null,
          valorProduto: null,
          valorFrete: null,
          valorSeguro: null,
          valorOutro: null,
          valorDesconto: null,
          entregaNegocioId: null,
          negocioCulturaMovimentoId: null,
          produtoBarraId: null,
          codigo: null,
          barras: null,
          produto: null,
          ncm: null,
          beneficioFiscal: null,
          excecaoTabelaIpi: null,
          totalizador: null,
          pedido: null,
          pedidoItem: null,
          fichaConteudoImportacao: null,
          barrasTributacao: null,
          unidadeMedidaTributacaoId: null,
          quantidadeTributacao: null,
          valorUnitarioTributacao: null,
          informacoesAdicionais: null,
          cest: null,
          escalaRelevante: null,
          cnpjFabricante: null,
          valorTotalTributos: null,
        }
      }
    },
    methods: {
      openModal: function(notaFiscaId, editType, item){
        this.isModalOpened = true;
        this.editionType = editType;
        this.item.notaFiscalId = notaFiscaId;
        if(editType === 'edit'){
          this.selectedItem = item;
          this.fillFormItem(item);
        }
      },
      closeModal: function(){
        this.clearFormItem();
        this.isModalOpened = false;
      },
      fillFormItem(nfItem){
        this.item.notaFiscalId = nfItem.nota_fiscal_id;
        this.item.cfopId = nfItem.cfop_id;
        this.item.quantidade = nfItem.quantidade;
        this.item.unidadeMedidaId = nfItem.unidade_medida_id;
        this.item.valorUnitario = nfItem.valor_unitario;
        this.item.valorProduto = nfItem.valor_produto;
        this.item.valorFrete = nfItem.valor_frete;
        this.item.valorSeguro = nfItem.valor_seguro;
        this.item.valorOutro = nfItem.valor_outro;
        this.item.valorDesconto = nfItem.valor_desconto;
        this.item.entregaNegocioId = nfItem.entrega_negocio_id;
        this.item.negocioCulturaMovimentoId = nfItem.negocio_cultura_movimento_id;
        this.item.produtoBarraId = nfItem.produto_barra_id;
        this.item.codigo = nfItem.codigo;
        this.item.barras = nfItem.barras;
        this.item.produto = nfItem.produto;
        this.item.ncm = nfItem.ncm;
        this.item.beneficioFiscal = nfItem.beneficio_fiscal;
        this.item.excecaoTabelaIpi = nfItem.excecao_tabela_ipi;
        this.item.totalizador = nfItem.totalizador;
        this.item.pedido = nfItem.pedido;
        this.item.pedidoItem = nfItem.pedido_item;
        this.item.fichaConteudoImportacao = nfItem.ficha_conteudo_importacao;
        this.item.barrasTributacao = nfItem.barras_tributacao;
        this.item.unidadeMedidaTributacaoId = nfItem.unidade_medida_tributacao_id;
        this.item.quantidadeTributacao = nfItem.quantidade_tributacao;
        this.item.valorUnitarioTributacao = nfItem.valor_unitario_tributacao;
        this.item.informacoesAdicionais = nfItem.informacoes_adicionais;
        this.item.cest = nfItem.cest;
        this.item.escalaRelevante = nfItem.escala_relevante;
        this.item.cnpjFabricante = nfItem.cnpj_fabricante;
        this.item.valorTotalTributos = nfItem.valor_total_tributos;
      },
      getItemValues(){
        let params = {
          nota_fiscal_id: this.item.notaFiscalId,
          cfop_id: this.item.cfopId,
          quantidade: this.item.quantidade,
          unidade_medida_id: this.item.unidadeMedidaId,
          valor_unitario: this.item.valorUnitario,
          valor_produto: this.item.valorProduto,
          valor_frete: this.item.valorFrete,
          valor_seguro: this.item.valorSeguro,
          valor_outro: this.item.valorOutro,
          valor_desconto: this.item.valorDesconto,
          entrega_negocio_id: this.item.entregaNegocioId,
          negoico_cultura_movimento_id: this.item.negocioCulturaMovimentoId,
          produto_barra_id: this.item.produtoBarraId,
          codigo: this.item.codigo,
          barras: this.item.barras,
          produto: this.item.produto,
          ncm: this.item.ncm,
          beneficio_fiscal: this.item.beneficioFiscal,
          excecao_tabela_ipi: this.item.excecaoTabelaIpi,
          totalizador: this.item.totalizador,
          peddo: this.item.pedido,
          pedido_item: this.item.pedidoItem,
          ficha_conteudo_importacao: this.item.fichaConteudoImportacao,
          barras_tributacao: this.item.barrasTributacao,
          unidade_medida_tributacao_id: this.item.unidadeMedidaTributacaoId,
          quantidade_tributacao: this.item.quantidadeTributacao,
          valor_unitario_tributacao: this.item.valorUnitarioTributacao,
          informacoes_adicionais: this.item.informacoesAdicionais,
          cest: this.item.cest,
          escala_relevante: this.item.escalaRelevante,
          cnpj_fabricante: this.item.cnpjFabricante,
          valor_total_tributos: this.item.valorTotalTributos,
        };
        return params;
      },
      updateItem: function(){
        this.$q.loading.show();
        this.notaFiscalService.updateItem(this.selectedItem.id, this.getItemValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Item atualizado com sucesso'});
          this.$root.$emit('refreshNotafiscalView');
          this.$q.loading.hide();
          this.closeModal();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error.response.data.message});
          this.$q.loading.hide();
        });
      },
      createItem: function(){
        this.$q.loading.show();
        this.notaFiscalService.createItem(this.getItemValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Item adicionado com sucesso'});
          this.$q.loading.hide();
          this.closeModal();
          this.$root.$emit('refreshNotafiscalView');
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error.response.data.message});
          this.$q.loading.hide();
        });
      },
      clearFormItem(){
        this.item = {
          notaFiscalId: null,
            cfopId: null,
            quantidade: null,
            unidadeMedidaId: null,
            valorUnitario: null,
            valorProduto: null,
            valorFrete: null,
            valorSeguro: null,
            valorOutro: null,
            valorDesconto: null,
            entregaNegocioId: null,
            negocioCulturaMovimentoId: null,
            produtoBarraId: null,
            codigo: null,
            barras: null,
            produto: null,
            ncm: null,
            beneficioFiscal: null,
            excecaoTabelaIpi: null,
            totalizador: null,
            pedido: null,
            pedidoItem: null,
            fichaConteudoImportacao: null,
            barrasTributacao: null,
            unidadeMedidaTributacaoId: null,
            quantidadeTributacao: null,
            informacoesAdicionais: null,
            cest: null,
            escalaRelevante: null,
            cnpjFabricante: null,
            valorTotalTributos: null,
        }
      }
    }
  }
</script>

<style scoped>

</style>
