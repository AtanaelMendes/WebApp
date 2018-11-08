import { helpers, email} from 'vuelidate/lib/validators'

export default class {
  endereco = {
    value: null,
    errorMessage: null
  };

  constructor(email){
    if(email !== undefined) {
      this.endereco.value = email.endereco.value;
    }
  }

  isValid(){
    let hasError = false;

    if(!helpers.req(this.endereco.value)){
      this.endereco.errorMessage = "Digite um email";
      hasError = true;
    }else if(!email(this.endereco.value)){
      this.endereco.errorMessage = "O formato do email não é válido";
      hasError = true;
    }

    return !hasError;
  };
}
