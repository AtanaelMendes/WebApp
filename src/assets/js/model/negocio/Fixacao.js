import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  negocioCultura = null;
  dataFixacao = {
    value: null,
    errorMessage: null
  };
  moeda = null;
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
  unidadeMedidaQuantidadeId = null;
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
  contaBancaria = null;
  observacoes = {
    value: null,
    errorMessage: null
  };
  parcelas = [];

  /*constructor(negocioFixacao){
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
      this.contaBancariaId.value = negocioFixacao.contaBancariaId.value;
      this.observacoes.value = negocioFixacao.observacoes.value;
    }
  };*/

  getValues(){
    return{
      negocio_cultura_id: this.negocioCultura.id,
      data_fixacao: this.dataFixacao.value,
      moeada_id: this.moeda.id,
      preco: this.preco.value,
      unidade_medida_preco_id: this.unidadeMedidaPrecoId.value,
      is_preco_liquido: this.isPrecoLiquido.value,
      quantidade: this.quantidade.value,
      unidade_medida_quantidade_id: this.unidadeMedidaQuantidadeId,
      total_bruto: this.totalBruto.value,
      total_impostos: this.totalImpostos.value,
      valor_outros_descontos: this.valorOutrosDescontos.value,
      valor_outros_acrescimos: this.valorOutrosAcrescimos.value,
      total_liquido: this.totalLiquido.value,
      conta_bancaria_id: this.contaBancaria.id,
      observacoes: this.observacoes.value
    }
  }
}
