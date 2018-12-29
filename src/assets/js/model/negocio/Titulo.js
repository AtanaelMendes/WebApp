import { helpers} from 'vuelidate/lib/validators'

export default class{
  isPagar = {
    value: null,
    errorMessage: null
  };
  indexador = null;
  valor = {
    value: null,
    errorMessage: null
  };
  parcelas = [];
  pessoaId = null;


  constructor(negocioTitulo){
    if(negocioTitulo !== undefined || negocioTitulo != null){
      this.isPagar.value = negocioTitulo.isPagar.value;
      this.indexador = negocioTitulo.indexador;
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
      pessoa_id: this.pessoaId,
      is_pagar: this.isPagar.value,
      indexador_id: this.indexador.id,
      parcelas: this.parcelas.map(function (parcela) {
        return {
          'valor': parcela.valor.value,
          'vencimento': parcela.vencimento.value
        }
      })
    }
  }
}
