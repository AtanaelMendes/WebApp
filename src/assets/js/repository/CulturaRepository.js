import Vue from 'vue'
import Cultura from "../dbModel/Cultura";

let table = Vue.prototype.db.culturas;

export default class CulturaRepository {
  update(cultura){
    if(!(cultura instanceof Cultura)){
      throw new Error('Objeto não é do tipo Cultura!');
    }
    return table.put(cultura)
  }
}
