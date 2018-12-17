import { helpers} from 'vuelidate/lib/validators'
export default class{
  nome = {
    value: null,
    errorMessage: null
  };
  constructor(marca){
    if(marca !== undefined || marca != null){
      this.nome.value = marca.nome.value;
    }
  }
  isValid(){
    let hasError = false;
    if(!helpers.req(this.nome.value)){
      this.nome.errorMessage = "Informe um nome";
      hasError = true;
    }
    if(this.nome.value && this.nome.value.length < 3){
      this.nome.errorMessage = "Nome muito curto";
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
