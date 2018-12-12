import {helpers} from "vuelidate/lib/validators";
export default class{
    estimativa = {
      value: null,
      errorMessage: null
    };
    tamanho = {
      value: null,
      errorMessage: null,
    };
  constructor(val){
    if(val !== undefined || val != null){
      this.tamanho.value = val.tamanho;
      this.estimativa.value = val.estimativa;
    }
  }
  isValid(){
    let hasError = false;
    if(!helpers.req(this.estimativa.value)){
      this.estimativa.errorMessage = "Informe uma estimativa";
      hasError = true;
    }
    if (!helpers.req(this.tamanho.value)) {
      this.tamanho.errorMessage = "Informe o tamanho da área";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return {
      estimativa: this.estimativa.value,
      tamanho: this.tamanho.value
    }
  }
}
