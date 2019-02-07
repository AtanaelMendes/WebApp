import Vue from 'vue'
import Safra from "../dbModel/Safra";

let table = Vue.prototype.db.safras;

export default class SafraRepository {
  update(safra){
    if(!(safra instanceof Safra)){
      throw new Error('Objeto não é do tipo Safra!');
    }
    return table.put(safra)
  }
}
