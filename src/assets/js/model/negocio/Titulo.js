import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  isPagar = {
    value: null,
    errorMessage: null
  };
  moedaId = {
    value: null,
    errorMessage: null
  };
  valor = {
    value: null,
    errorMessage: null
  };
  parcelas = [];
  constructor(negocioTitulo){
    if(negocioTitulo !== undefined || negocioTitulo != null){
      this.isPagar.value = negocioTitulo.isPagar.value;
      this.moedaId.value = negocioTitulo.moedaId.value;
      this.valor.value = negocioTitulo.valor.value;
      this.parcelas = negocioTitulo.parcelas
    }
  }
  isValid(){
    let hasError = false;
    if(!helpers.req(this.valor.value)){
      this.valor.errorMessage = "Informe o Valor";
      hasError = true;
    }
    if(this.valor.value <= 0){
      this.valor.errorMessage = "Informe o valor";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      is_pagar: this.isPagar.value,
      moeda_id: this.moedaId.value,
      valor: this.valor.value,
      titulos_liquidacoes: this.parcelas
    }
  }
}
