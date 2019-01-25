import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  negocioCulturaId = null;
  armazemId = null;
  motoristaId = null;
  serieId = null;
  notaNumero = null;
  peso = null;
  unidadeMedidaId = null;
  valor = null;
  total = null;
  cfopId = null;
  is_saida = null;
  emissao = {
    value: new Date(),
    errorMessage: null
  };


  isValid(hasNotaFiscal = true){
    let hasError = false;

    if (!helpers.req(this.serieId)) {
      hasError = true;
    }
    if (!helpers.req(this.notaNumero)) {
      hasError = true;
    }
    if (!helpers.req(this.peso)) {
      hasError = true;
    }
    if (!helpers.req(this.unidadeMedidaId)) {
      hasError = true;
    }
    if (!helpers.req(this.valor)) {
      hasError = true;
    }
    if (!helpers.req(this.total)) {
      hasError = true;
    }
    if (!helpers.req(this.cfopId)) {
      hasError = true;
    }
    if (!helpers.req(this.emissao.value)) {
      hasError = true;
    }

    return hasNotaFiscal ? !hasError : true;
  };
  getValues(hasNotaFiscal = true){
    let body = {
      negocio_cultura_id: this.negocioCulturaId,
      armazem_id: this.armazemId,
      motorista_id: this.motoristaId,
    };

    if(hasNotaFiscal){
      body.nota_fiscal = {
        nota_fiscal_serie_id: this.serieId,
        numero: this.notaNumero,
        peso: this.peso,
        unidade_medida_id: this.unidadeMedidaId,
        valor_unitario: this.valor,
        valor_total: this.total,
        cfop_id: this.cfopId,
        emissao: this.emissao.value,
        is_saida: this.is_saida,
      };
    }

    return body;
  }
}
