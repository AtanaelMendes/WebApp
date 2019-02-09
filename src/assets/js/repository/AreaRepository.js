import Vue from 'vue'
import Area from "../dbModel/Area";

let table = Vue.prototype.db.areas;

export default class AreaRepository {
  update(area){
    if(!(area instanceof Area)){
      throw new Error('Objeto não é do tipo Area!');
    }
    return table.put(area)
  }
}
