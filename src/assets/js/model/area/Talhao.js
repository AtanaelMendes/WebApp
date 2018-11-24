import { helpers} from 'vuelidate/lib/validators'
export default class{
  areaId = {
    value: null,
    errorMessage: null
  };
  nome = {
    value: null,
    errorMessage: null
  };
  tamanho = {
    value: null,
    errorMessage: null
  };
  unidadeAreaId = {
    value: null,
    errorMessage: null
  };
  constructor(talhao){
    if(talhao !== undefined){
      this.areaId.value = talhao.areaId.value;
      this.nome.value = talhao.nome.value;
      this.tamanho.value = talhao.tamanho.value;
      this.unidadeAreaId.value = talhao.unidadeAreaId.value;
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
    if (!helpers.req(this.tamanho.value)) {
      this.tamanho.errorMessage = "Informe o tamanho da área";
      hasError = true;
    }
    if (!helpers.req(this.unidadeAreaId.value)) {
      this.unidadeAreaId.errorMessage = "Informe uma undidade de área";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      area_id: this.areaId.value,
      nome: this.nome.value,
      tamanho: this.tamanho.value,
      unidade_area_id: this.unidadeAreaId.value
    }
  }
}
