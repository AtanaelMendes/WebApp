import { helpers} from 'vuelidate/lib/validators'

export default class{
  id= null;
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

  constructor(cultura){
    if(cultura !== undefined || cultura != null){
      this.id = cultura.id;
      this.produto.value = {'id':cultura.produto_id, 'label':cultura.nome};
      this.tamanho.value = cultura.tamanho;
      this.estimativa.value = cultura.estimativa;
      this.estimativaUnidadeMedida.value = {'id':cultura.estimativa_unidade_medida_id, 'nome':cultura.estimativa_unidade_medida};
    }
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
      id: this.id,
      produto_id: this.produto.value.id,
      tamanho: this.tamanho.value,
      estimativa: this.estimativa.value,
      estimativa_unidade_medida_id: this.estimativaUnidadeMedida.value.id
    }
  }
}
