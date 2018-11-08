import { helpers} from 'vuelidate/lib/validators'
export default class{
  nome = {
    value: null,
    errorMessage: null
  };
  id = {
    value: null,
    errorMessage: null
  };
  constructor(talhao){
    if(talhao !== undefined){
      this.id.value = talhao.id.value;
      this.nome.value = talhao.nome.value;
      this.talhoes = talhao.talhoes;
    }
  };
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
  };
  getValues(){
    return{
      id: this.id.value,
      nome: this.nome.value,
      talhoes: this.talhoes
    }
  }
}
