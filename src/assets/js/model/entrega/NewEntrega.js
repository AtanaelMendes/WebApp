import { helpers} from 'vuelidate/lib/validators'
// const moment = require('moment');
export default class{
  caminhaoId = null;
  //safraCultura = null;
  //areaId = null;
  safraCulturaTalhaoId = null;
  //cultivarId = null;

  // constructor(novaCarga){
  //   if(novaCarga !== undefined || novaCarga != null){
  //     this.caminhaoId.value = novaCarga.caminhaoId.value;
  //     this.safraCulturaId.value = novaCarga.safraCulturaId.value;
  //     this.areaId.value = novaCarga.areaId.value;
  //     this.talhaoId.value = novaCarga.talhaoId.value;
  //     this.cultivarId.value = novaCarga.cultivarId.value;
  //   }
  // };
  //
  // isValid(){
  //   let hasError = false;
  //   if(!helpers.req(this.caminhaoId.value)){
  //     this.caminhaoId.errorMessage = "Informe o caminhão";
  //     hasError = true;
  //   }
  //   return !hasError;
  // };

  getValues(){
    return{
      caminhao_id: this.caminhaoId,
      safra_cultura_talhao_id: this.safraCulturaTalhaoId,
      // safra_id: this.safraCultura.id,
      // area_id: this.areaId,
      // talhao_id: this.talhaoId,
      // cultivar_id: this.cultivarId,
    }
  }
}
