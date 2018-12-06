import { helpers} from 'vuelidate/lib/validators'
export default class{
  culturas = [];
  constructor(culturas){
    if(culturas !== undefined || culturas != null){
      this.culturas.value = safra.culturas.id;
    }
  }
  isValid(){
    let hasError = false;
    if(helpers.len(this.culturas.value) > 1){
      this.culturas.errorMessage = "Selecione ao menos uma cultura.";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      culturas: this.culturas.value
    }
  }
}
