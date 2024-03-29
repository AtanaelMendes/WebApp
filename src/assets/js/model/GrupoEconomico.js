import { helpers} from 'vuelidate/lib/validators'

export default {
  nome: {
    value: null,
    errorMessage: null
  },

  isValid(){
    let hasError = false;

    if(!helpers.req(this.nome.value)){
      this.nome.errorMessage = "Digite um nome";
      hasError = true;
    }else if(helpers.len(this.nome.value) < 3){
      this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres";
      hasError = true;
    }

    return !hasError;
  },

  getValues(){
    return{
      nome: this.nome.value,
    }
  }
}
