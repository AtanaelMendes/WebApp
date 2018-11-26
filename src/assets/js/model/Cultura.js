import { helpers} from 'vuelidate/lib/validators'

export default class{
  produto = {
    value: null,
    errorMessage: null
  };
  tamanho = {
    value: null,
    errorMessage: null
  };
  estimativa = {
    value: null,
    errorMessage: null
  };
  estimativaUnidadeMedida = {
    value: null,
    errorMessage: null
  };

  constructor(){

  }

  isValid(){
    let hasError = false;
    if(!helpers.req(this.produto.value)){
      this.produto.errorMessage = "Selecione um produto.";
      hasError = true;
    }

    if(!helpers.req(this.tamanho.value)){
      this.tamanho.errorMessage = "Digite um tamanho.";
      hasError = true;
    }

    if (!helpers.req(this.estimativa.value)) {
      this.estimativa.errorMessage = "Digite uma estimativa.";
      hasError = true;
    }

    if (!helpers.req(this.estimativaUnidadeMedida.value)) {
      this.estimativaUnidadeMedida.errorMessage = "Selecione a unidade de medida da estimativa.";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
      produto_id: this.produto.value.id,
      tamanho: this.tamanho.value,
      estimativa: this.estimativa.value,
      estimativa_unidade_medida_id: this.estimativaUnidadeMedida.value.id
    }
  }
}
