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
  unidadeMedidaId = null;
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
    if(!helpers.req(this.unidadeMedidaId)){
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      numero_ticket: this.numeroTicket.value,
      emissao: this.emissao.value,
      peso_bruto_total: this.pesoBrutoTotal.value,
      peso_tara: this.pesoTara.value,
      peso_liquido: this.pesoLiquido.value,//peso_bruto_produto - peso_desconto
      unidade_medida_id: this.unidadeMedidaId,
      classificacoes: this.entregaClassificacao.map(function(classificacao){
        return {
          classificacao_id: classificacao.classificacao_id,
          peso_desconto: classificacao.peso_desconto.value,
          verificado: classificacao.verificado.value,
        };
      }),
      negocio_culturas: this.negocioCulturas
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
