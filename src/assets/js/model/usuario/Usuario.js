import {email, helpers} from 'vuelidate/lib/validators'
export default class{
  email = {
    value: null,
    errorMessage: null
  };
  produtor = {
    value: null,
    errorMessage: null
  };
  password = {
    value: null,
    errorMessage: null
  };
  repeatPassword = {
    value: null,
    errorMessage: null
  };
  selectedRoles = {
    value: [],
    errorMessage: null
  };
  constructor(usuario){
    if(usuario !== undefined){
      this.email.value = usuario.email.value;
      this.produtor.value = usuario.produtor.value;
      this.password.value = usuario.password.value;
      this.repeatPassword.value = usuario.repeatPassword.value;
      this.selectedRoles.value = usuario.selectedRoles.value;
    }
  };
  isValid(){
    let hasError = false;
    if(!helpers.req(this.email.value)){
      this.email.errorMessage = "Digite um email";
      hasError = true;
    }else if(!email(this.email.value)){
      this.email.errorMessage = "O formato do email não é válido";
      hasError = true;
    }

    if(!helpers.req(this.produtor.value)){
      this.produtor.errorMessage = "Selecione um Produtor";
      hasError = true;
    }

    if (!helpers.req(this.password.value)) {
      this.password.errorMessage = "Confirme a senha";
      hasError = true;
    }

    if(helpers.len(this.password.value) < 8){
      this.password.errorMessage = "A senha deve ter no mínimo 8 caracteres";
      hasError = true;
    }

    if (!helpers.req(this.repeatPassword.value)) {
      this.repeatPassword.errorMessage = "Confirme a senha";
      hasError = true;
    }

    if (this.repeatPassword.value != this.password.value) {
      this.repeatPassword.errorMessage = "As senhas não conferem";
      hasError = true;
    }

    if (!helpers.req(this.selectedRoles.value)) {
      this.selectedRoles.errorMessage = "Escolha ao menos um Papel para o usuário";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
      email: this.email.value,
      produtor_id: this.produtor.value,
      password: this.password.value,
      selectedRoles: this.selectedRoles.value,
    }
  };

}
