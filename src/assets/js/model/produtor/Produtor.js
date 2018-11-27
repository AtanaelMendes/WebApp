import { helpers} from 'vuelidate/lib/validators'
export default class{
  nome = {
    value: null,
    errorMessage: null
  };
  constructor(val){
    if(val !== undefined){
      this.nome.value = val.nome.value;
    }
  };
  isValid(){
    let hasError = false;
    if(!helpers.req(this.nome.value)){
      this.nome.errorMessage = "Informe um nome";
      hasError = true;
    }else if(helpers.len(this.nome.value) < 3){
      this.nome.errorMessage = "O NOME deve ter no mínimo 3 caracteres";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      nome: this.nome.value,
    }
  }
}

