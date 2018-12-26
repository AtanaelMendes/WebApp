// import { helpers} from 'vuelidate/lib/validators'
const moment = require('moment');
export default class{
  isPagar = {
    value: null,
    errorMessage: null
  };
  produtoId = {
    value: null,
    errorMessage: null
  };
  quantidade = {
    value: null,
    errorMessage: null
  };
  preco = {
    value: null,
    errorMessage: null
  };
  indexadorId = {
    value: null,
    errorMessage: null
  };
  valorTotal = {
    value: null,
    errorMessage: null
  };
  constructor(negocioProduto){
    if(negocioProduto !== undefined || negocioProduto != null){
      this.isPagar.value = negocioProduto.isPagar.value;
      this.produtoId.value = negocioProduto.produtoId.value;
      this.quantidade.value = negocioProduto.quantidade.value;
      this.preco.value = negocioProduto.preco.value;
      this.indexadorId.value = negocioProduto.indexadorId.value;
      this.valorTotal.value = negocioProduto.valorTotal.value;
    }
  };
  getValues(){
    return{
      is_pagar: this.isPagar.value,
      produto_id: this.produtoId.value,
      quantidade: this.quantidade.value,
      preco: this.preco.value,
      indexador_id: this.indexadorId.value,
      valor_total: this.valorTotal.value
    }
  }
  // isValid(){
  //   let hasError = false;
  //   if(!helpers.req(this.valor.value)){
  //     this.valor.errorMessage = "Informe o Valor";
  //     hasError = true;
  //   }
  //   if(this.valor.value <= 0){
  //     this.valor.errorMessage = "Informe o valor";
  //     hasError = true;
  //   }
  //   return !hasError;
  // };
}
