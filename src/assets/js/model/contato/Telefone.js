import { helpers } from 'vuelidate/lib/validators'

export default class {
  tipo= 0;
  numero = {
    value: null,
    errorMessage: null
  };

  constructor(telefone){
    if(telefone !== undefined) {
      this.tipo = telefone.tipo;
      this.numero.value = telefone.numero.value;
    }
  }

  isValid(){
    let hasError = false;

    if(!helpers.req(this.numero.value)){
      this.numero.errorMessage = "Digite um número";
      hasError = true;
    }else if(helpers.len(this.numero.value) < 13){
      this.numero.errorMessage = "O formato do telefone não é válido";
      hasError = true;
    }

    return !hasError;
  };

  getValues(){
    return {
      numero: this.numero.value,
      is_celular: this.tipo === 1,
    }
  }
}
