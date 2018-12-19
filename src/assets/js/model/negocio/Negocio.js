import { helpers} from 'vuelidate/lib/validators'
export default class{
  tipoNegocioId = null; // TIPOS DE NEGOCIO = compra, venda, troca, balcao
  emissao = {
    value: null,
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
      tipoNegocioId: this.tipoNegocioId,
      emissao: this.emissao.value,
      numeroPedido: this.numeroPedido.value,
      numeroContrato: this.numeroContrato.value,
      observacoes: this.observacoes.value
    }
  }
}
