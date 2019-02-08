import Vue from 'vue'
import SafraCultura from "../dbModel/SafraCultura";

let table = Vue.prototype.db.safra_culturas;
export default class SafraCulturaRepository {

  update(safraCultura){
    if(!(safraCultura instanceof SafraCultura)){
      throw new Error('Objeto não é do tipo SafraCultura!');
    }
    return table.put(safraCultura)
  };

}
