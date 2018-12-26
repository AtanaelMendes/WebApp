import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  negocioCulturaId = {
    value: null,
    errorMessage: null
  };
  dataFixacao = {
    value: null,
    errorMessage: null
  };
  moedaId = {
    value: null,
    errorMessage: null
  };
  preco = {
    value: null,
    errorMessage: null
  };
  unidadeMedidaPrecoId = {
    value: null,
    errorMessage: null
  };
  isPrecoLiquido = {
    value: false,
    errorMessage: null
  };
  quantidade = {
    value: null,
    errorMessage: null
  };
  unidadeMedidaQuantidadeId = {
    value: null,
    errorMessage: null
  };
  totalBruto = {
    value: null,
    errorMessage: null
  };
  totalImpostos = {
    value: null,
    errorMessage: null
  };
  valorOutrosDescontos = {
    value: null,
    errorMessage: null
  };
  valorOutrosAcrescimos = {
    value: null,
    errorMessage: null
  };
  totalLiquido = {
    value: null,
    errorMessage: null
  };
  observacoes = {
    value: null,
    errorMessage: null
  };
  constructor(negocioFixacao){
    if (negocioFixacao !== undefined || negocioFixacao != null){
      this.negocioCulturaId.value = negocioFixacao.negocioCulturaId.value;
      this.dataFixacao.value = negocioFixacao.dataFixacao.value;
      this.moedaId.value = negocioFixacao.moedaId.value;
      this.preco.value = negocioFixacao.preco.value;
      this.unidadeMedidaPrecoId.value = negocioFixacao.unidadeMedidaPrecoId.value;
      this.isPrecoLiquido.value = negocioFixacao.isPrecoLiquido.value;
      this.quantidade.value = negocioFixacao.quantidade.value;
      this.unidadeMedidaQuantidadeId.value = negocioFixacao.unidadeMedidaQuantidadeId.value;
      this.totalBruto.value = negocioFixacao.totalBruto.value;
      this.totalImpostos.value = negocioFixacao.totalImpostos.value;
      this.valorOutrosDescontos.value = negocioFixacao.valorOutrosDescontos.value;
      this.valorOutrosAcrescimos.value = negocioFixacao.valorOutrosAcrescimos.value;
      this.totalLiquido.value = negocioFixacao.totalLiquido.value;
      this.observacoes.value = negocioFixacao.observacoes.value;
    }
  };
  // isValid(){
  //   let hasError = false;
  //   if(!helpers.req(this.quantidade.value)){
  //     this.quantidade.errorMessage = "Informe a quantidade";
  //     hasError = true;
  //   }
  //   if(!helpers.req(this.preco.value)){
  //     this.preco.errorMessage = "Informe o Preço";
  //     hasError = true;
  //   }
  //   if(!helpers.req(this.valorTotal.value)){
  //     this.valorTotal.errorMessage = "Informe o valor total";
  //     hasError = true;
  //   }
  //   return !hasError;
  // };
  getValues(){
    return{
      negocio_cultura_id: this.negocioCulturaId.value,
      data_fixacao: this.dataFixacao.value,
      moeada_id: this.moedaId.value,
      preco: this.preco.value,
      unidade_medida_preco_id: this.unidadeMedidaPrecoId.value,
      is_preco_liquido: this.isPrecoLiquido.value,
      quantidade: this.quantidade.value,
      unidade_medida_quantidade_id: this.unidadeMedidaQuantidadeId.value,
      total_bruto: this.totalBruto.value,
      total_impostos: this.totalImpostos.value,
      valor_outros_descontos: this.valorOutrosDescontos.value,
      valor_outros_acrescimos: this.valorOutrosAcrescimos.value,
      total_liquido: this.totalLiquido.value,
      observacoes: this.observacoes.value
    }
  }
}
