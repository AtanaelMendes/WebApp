import {helpers} from 'vuelidate/lib/validators'

export default class {
  nome = {
    value: null,
    errorMessage: null
  };
  telefones = [];
  emails = [];
  isCobranca = false;
  isFiscal = false;

  constructor(){

  }

  addTelefone(telefone){
    this.telefones.push(telefone);
  };
  editTelefone(telefone, index){
    this.telefones[index] = telefone;
  };
  removeTelefone(index){
    this.telefones.splice(index, 1);
  };

  addEmail(email){
    this.emails.push(email)
  };
  editEmail(telefone, index){
    this.emails[index] = telefone;
  };
  removeEmail(index){
    this.emails.splice(index, 1);
  };

  isValid(){
    let hasError = false;

    if(helpers.req(this.nome.value)){
      if(helpers.len(this.nome.value) < 3){
        this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres";
        hasError = true;
      }
    }

    return !hasError;
  }
}
