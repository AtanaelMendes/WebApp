import { helpers} from 'vuelidate/lib/validators'

export default class{
  isPagar = {
    value: null,
    errorMessage: null
  };
  produto = null;
  quantidade = {
    value: null,
    errorMessage: null
  };
  preco = {
    value: null,
    errorMessage: null
  };
  indexador = null;

  valorTotal = {
    value: null,
    errorMessage: null
  };
  constructor(negocioProduto){
    // if(negocioProduto !== undefined || negocioProduto != null){
    //   this.isPagar.value = negocioProduto.isPagar.value;
    //   this.produto = negocioProduto.produtoId.value;
    //   this.quantidade.value = negocioProduto.quantidade.value;
    //   this.preco.value = negocioProduto.preco.value;
    //   this.indexadorId.value = negocioProduto.indexadorId.value;
    //   this.valorTotal.value = negocioProduto.valorTotal.value;
    // }
  };
  isValid(){

    let hasError = false;
    if(!helpers.req(this.quantidade.value)){
      this.quantidade.errorMessage = "Informe a quantidade";
      hasError = true;
    }
    if(!helpers.req(this.preco.value)){
      this.preco.errorMessage = "Informe o Preço";
      hasError = true;
    }
    if(!helpers.req(this.valorTotal.value)){
      this.valorTotal.errorMessage = "Informe o valor total";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      is_pagar: this.isPagar.value,
      produto_id: this.produto.id,
      quantidade: this.quantidade.value,
      preco: this.preco.value,
      indexador_id: this.indexador.id,
      valor_total: this.valorTotal.value
    }
  }
}
