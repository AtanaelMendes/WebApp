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

  getValues(){
    return{
      produto_id: this.produto.value.id,
      tamanho: this.tamanho.value,
      estimativa: this.estimativa.value,
      estimativa_unidade_medida_id: this.estimativaUnidadeMedida.value.id
    }
  }
}
