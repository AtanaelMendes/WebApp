import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  id = null;
  numeroTicket = {
    value: null,
    errorMessage: null
  };
  emissao = {
    value: new Date(moment()).toISOString(),
    errorMessage: null
  };
  pesoBrutoTotal = {
    value: null,
    errorMessage: null
  };
  pesoBrutoProduto = {
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
    if(!helpers.req(this.pesoBrutoProduto.value)){
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      numero_ticket: this.numeroTicket.value,
      emissao: this.emissao.value,
      peso_bruto_produto: this.pesoBrutoProduto.value,
      peso_bruto_total: this.pesoBrutoTotal.value,
      peso_tara: this.pesoTara.value,
      peso_liquido: this.pesoLiquido.value,
      peso_desconto: this.entregaClassificacao.reduce(function (accumulator, classificacao) {
        return accumulator + classificacao.peso_desconto.value;
      }, 0),
      classificacoes: this.entregaClassificacao.map(function(classificacao){
        let ret = {
          classificacao_id: classificacao.classificacao_id,
          peso_desconto: classificacao.peso_desconto.value,
          verificado: classificacao.verificado.value,
        };

        if(classificacao.id){
          ret.id = classificacao.id
        }
        return ret;
      }),
    }
  }
}
