import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  negocioId = {
    value: null,
    errorMessage: null
  };
  armazemId = {
    value: null,
    errorMessage: null
  };
  motoristaId = {
    value: null,
    errorMessage: null
  };
  ie = {
    value: null,
    errorMessage: null
  };
  serie = {
    value: null,
    errorMessage: null
  };
  notaNumero = {
    value: null,
    errorMessage: null
  };
  peso = {
    value: 30000,
    errorMessage: null
  };
  unidadeMedidaId = {
    value: null,
    errorMessage: null
  };
  valor = {
    value: null,
    errorMessage: null
  };
  total = {
    value: null,
    errorMessage: null
  };
  cfop = {
    value: null,
    errorMessage: null
  };
  emissao = {
    value: moment().format('YYYY-MM-DD'),
    errorMessage: null
  };
  constructor(sendCarga){
    if(sendCarga !== undefined || sendCarga != null){
      this.negocioId.value = sendCarga.negocioId.value;
      this.armazemId.value = sendCarga.armazemId.value;
      this.motoristaId.value = sendCarga.motoristaId.value;
      this.ie.value = sendCarga.ie.value;
      this.serie.value = sendCarga.serie.value;
      this.notaNumero.value = sendCarga.notaNumero.value;
      this.peso.value = sendCarga.peso.value;
      this.unidadeMedidaId.value = sendCarga.unidadeMedidaId.value;
      this.valor.value = sendCarga.valor.value;
      this.total.value = sendCarga.total.value;
      this.cfop.value = sendCarga.cfop.value;
      this.emissao.value = sendCarga.emissao.value;
    }
  };
  isValid(){
    let hasError = false;
    if(!helpers.req(this.ie.value)){
      hasError = true;
    }
    if(!helpers.req(this.serie.value)){
      hasError = true;
    }
    if(!helpers.req(this.notaNumero.value)){
      hasError = true;
    }
    if(!helpers.req(this.peso.value)){
      hasError = true;
    }
    if(!helpers.req(this.unidadeMedidaId.value)){
      hasError = true;
    }
    if(!helpers.req(this.valor.value)){
      hasError = true;
    }
    if(!helpers.req(this.total.value)){
      hasError = true;
    }
    if(!helpers.req(this.cfop.value)){
      hasError = true;
    }
    if(!helpers.req(this.emissao.value)){
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      negocio_id: this.negocioId.value,
      armazem_id: this.armazemId.value,
      motorista_id: this.motoristaId.value,
      ie: this.ie.value,
      serie: this.serie.value,
      nota_numero: this.notaNumero.value,
      peso: this.peso.value,
      unidade_medida_id: this.unidadeMedidaId.value,
      valor: this.valor.value,
      total: this.total.value,
      cfop: this.cfop.value,
      emisao: this.emisao.value,
    }
  }
}
