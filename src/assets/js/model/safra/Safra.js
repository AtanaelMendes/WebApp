import { helpers} from 'vuelidate/lib/validators'
export default class{
  inicio = {
    value: null,
    errorMessage: null
  };
  fim = {
    value: null,
    errorMessage: null
  };
  safrinha = {
    value: false,
    errorMessage: null
  };
  constructor(safra){
    if(safra !== undefined || safra != null){
      this.inicio.value = safra.inicio.toString();
      this.fim.value = safra.fim.toString();
      this.safrinha.value = safra.safrinha;
    }
  }
  isValid(){
    let hasError = false;
    if(!helpers.req(this.inicio.value)){
      this.inicio.errorMessage = "Digite o ano de inicio da safra.";
      hasError = true;
    }else if(helpers.len(this.inicio.value) < 4){
      this.inicio.errorMessage = "O formato do ano esta inválido.";
      hasError = true;
    }

    if(!helpers.req(this.fim.value)){
      this.fim.errorMessage = "Digite o ano de fim da safra.";
      hasError = true;
    }else if(helpers.len(this.fim.value) < 4){
      this.fim.errorMessage = "O formato do ano esta inválido.";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
      ano_inicio: this.inicio.value,
      ano_fim: this.fim.value,
      is_safrinha: this.safrinha.value
    }
  }
}
