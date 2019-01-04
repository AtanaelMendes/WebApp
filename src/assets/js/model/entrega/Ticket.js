import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  numeroTicket = {
    value: null,
    errorMessage: null
  };
  emissao = {
    value: null,
    errorMessage: null
  };
  pesoBrutoTotal = {
    value: null,
    errorMessage: null
  };
  pesoTara = {
    value: null,
    errorMessage: null
  };
  pesoLiquido = {
    value: null,
    errorMessage: null
  };
  entregaClassificacao = [];
  negocioCulturas = [];

  isValid(){
    let hasError = false;
    if(!helpers.req(this.numeroTicket.value)){
      hasError = true;
    }
    if(!helpers.req(this.emissao.value)){
      hasError = true;
    }
    if(!helpers.req(this.pesoBrutoTotal.value)){
      hasError = true;
    }
    if(!helpers.req(this.pesoTara.value)){
      hasError = true;
    }
    if(!helpers.req(this.pesoLiquido.value)){
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      numero_ticket: this.numeroTicket.value,
      emisao: this.emisao.value,
      peso_bruto_total: this.pesoBrutoTotal.value,
      peso_tara: this.pesoTara.value,
      peso_liquido: this.pesoLiquido.value,
      entrega_classificacao: this.entregaClassificacao,
    }
  }


  addNegocioCultura(negocioCultura){
    this.negocioCulturas.push(negocioCultura);
  }

  removeNegocioCultura(index){
    this.negocioCulturas.splice(index, 1);
  }

  existsNegocioCulturaById(id){
    return this.negocioCulturas.map(negocioCultura => negocioCultura.id).indexOf(id);
  }

  getNegocioCulturaById(id){
    return this.negocioCulturas[this.existsNegocioCulturaById(id)]
  }
}
