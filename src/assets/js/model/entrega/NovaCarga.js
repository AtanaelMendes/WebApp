import { helpers} from 'vuelidate/lib/validators'
// const moment = require('moment');
export default class{
  caminhaoId = {
    value: null,
    errorMessage: null
  };
  safraId = {
    value: null,
    errorMessage: null
  };
  areaId = {
    value: null,
    errorMessage: null
  };
  talhaoId = {
    value: null,
    errorMessage: null
  };
  cultivarId = {
    value: null,
    errorMessage: null
  };
  constructor(novaCarga){
    if(novaCarga !== undefined || novaCarga != null){
      this.caminhaoId.value = novaCarga.caminhaoId.value;
      this.safraId.value = novaCarga.safraId.value;
      this.areaId.value = novaCarga.areaId.value;
      this.talhaoId.value = novaCarga.talhaoId.value;
      this.cultivarId.value = novaCarga.cultivarId.value;
    }
  };
  isValid(){
    let hasError = false;
    if(!helpers.req(this.caminhaoId.value)){
      this.caminhaoId.errorMessage = "Informe o caminhão";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      caminhao_id: this.caminhaoId.value,
      safra_id: this.safraId.value,
      area_id: this.areaId.value,
      talhao_id: this.talhaoId.value,
      cultivar_id: this.cultivarId.value,
    }
  }
}
