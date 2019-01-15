import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  negocioCulturaId = null;
  armazemId = null;
  motoristaId = null;
  serie = null;
  notaNumero = null;
  peso = null;
  unidadeMedidaId = null;
  valor = null;
  total = null;
  cfop = null;
  emissao = {
    value: new Date(),
    errorMessage: null
  };


  isValid(){
    let hasError = false;
    if(!helpers.req(this.serie)){
      hasError = true;
    }
    if(!helpers.req(this.notaNumero)){
      hasError = true;
    }
    if(!helpers.req(this.peso)){
      hasError = true;
    }
    if(!helpers.req(this.unidadeMedidaId)){
      hasError = true;
    }
    if(!helpers.req(this.valor)){
      hasError = true;
    }
    if(!helpers.req(this.total)){
      hasError = true;
    }
    if(!helpers.req(this.cfop)){
      hasError = true;
    }
    if(!helpers.req(this.emissao.value)){
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      negocio_cultura_id: this.negocioCulturaId,
      armazem_id: this.armazemId,
      motorista_id: this.motoristaId,
      nota_fiscal_serie_id: this.serie.id,
      numero: this.notaNumero,
      peso: this.peso,
      unidade_medida_id: this.unidadeMedidaId.id,
      valor_unitario: this.valor,
      valor_total: this.total,
      cfop_id: this.cfop.id,
      emissao: this.emissao.value,
      is_saida: this.cfop.is_saida,
    }
  }
}
