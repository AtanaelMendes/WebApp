import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  tipoNegocioId = null; // TIPOS DE NEGOCIO = compra, venda, troca, balcao
  pessoaId = {
    value: null,
    errorMessage: null
  };
  emissao = {
    value: moment(new Date()).format('YYYY-MM-DD'),
    errorMessage: null
  };
  numeroPedido = {
    value: null,
    errorMessage: null
  };
  numeroContrato = {
    value: null,
    errorMessage: null
  };
  observacoes = {
    value: null,
    errorMessage: null
  };
  constructor(contrato){
    if(contrato !== undefined || contrato != null){
      this.tipoNegocioId = contrato.tipoNegocioId;
      this.pessoaId.value = contrato.pessoaId.value;
      this.emissao.value = contrato.emissao.value;
      this.numeroPedido.value = contrato.numeroPedido.value;
      this.numeroContrato.value = contrato.numeroContrato.value;
      this.observacoes.value = contrato.observacoes.value;
    }
  }

  isValid(){
    let hasError = false;
    if(!helpers.req(this.emissao.value)){
      this.emissao.errorMessage = "Informe data do negócio";
      hasError = true;
    }

    if(!helpers.req(this.pessoaId.value)){
      this.pessoaId.errorMessage = "Informe o negociante";
      hasError = true;
    }

    if(!helpers.req(this.numeroPedido.value)){
      this.numeroPedido.errorMessage = "Informe o número do pedio";
      hasError = true;
    }

    if(!helpers.req(this.numeroContrato.value)){
      this.numeroContrato.errorMessage = "Informe o número do negócio";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
      tipo_negocio_id: this.tipoNegocioId,
      pessoa_id: this.pessoaId.value,
      emissao: this.emissao.value,
      numero_pedido: this.numeroPedido.value,
      numero_contrato: this.numeroContrato.value,
      observacoes: this.observacoes.value
    }
  }
}
