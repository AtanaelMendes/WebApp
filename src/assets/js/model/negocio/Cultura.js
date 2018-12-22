import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  negocioId = {
    value: null,
    errorMessage: null
  };
  safraCulturaId = {
    value: null,
    errorMessage: null
  };
  isPagar = {
    value: null,
    errorMessage: null
  };
  quantidade = {
    value: null,
    errorMessage: null
  };
  unidadeMedidaId = {
    value: null,
    errorMessage: null
  };
  prazoEntregaInicial = {
    // value: moment(new Date()).format('YYYY-MM-DD'),
    value: null,
    errorMessage: null
  };
  prazoEntregaFinal = {
    value: null,
    errorMessage: null
  };
  classificacoes = [];
  armazens = [];
  observacoes = {
    value: null,
    errorMessage: null
  };
  constructor(negocioCultura){
    if(negocioCultura !== undefined || negocioCultura != null){
      this.negocioId.value = negocioCultura.negocioId.value;
      this.safraCulturaId.value = negocioCultura.safraCulturaId.value;
      this.isPagar.value = negocioCultura.isPagar.value;
      this.quantidade.value = negocioCultura.quantidade.value;
      this.unidadeMedidaId.value = negocioCultura.unidadeMedidaId.value;
      this.prazoEntregaInicial.value = negocioCultura.prazoEntregaInicial.value;
      this.prazoEntregaFinal.value = negocioCultura.prazoEntregaFinal.value;
      this.classificacoes = negocioCultura.classificacoes;
      this.observacoes.value = negocioCultura.observacoes.value;
    }
  }

  isValid(){
    let hasError = false;
    if(!helpers.req(this.safraCulturaId.value)){
      this.safraCulturaId.errorMessage = "Informe a safra cultura";
      hasError = true;
    }

    if(!helpers.req(this.isPagar.value)){
      this.isPagar.errorMessage = "Informe entrada ou saída";
      hasError = true;
    }

    if(!helpers.req(this.unidadeMedidaId.value)){
      this.unidadeMedidaId.errorMessage = "Informe a unidade medida";
      hasError = true;
    }

    if(!helpers.req(this.prazoEntregaInicial.value)){
      this.prazoEntregaInicial.errorMessage = "Informe o prazo inicial";
      hasError = true;
    }

    if(!helpers.req(this.prazoEntregaFinal.value)){
      this.prazoEntregaFinal.errorMessage = "Informe o prazo final";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
      negocio_id: this.negocioId.value,
      safra_cultura_id: this.safraCulturaId.value,
      is_pagar: this.isPagar.value,
      quantidade: this.quantidade.value,
      unidade_medida_id: this.unidadeMedidaId.value,
      prazo_entrega_inicial: this.prazoEntregaInicial.value,
      prazo_entrega_final: this.prazoEntregaFinal.value,
      observacoes: this.observacoes.value
    }
  }
}
