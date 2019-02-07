import Vue from 'vue'
import Unidade from "../dbModel/Unidade";

let table = Vue.prototype.db.unidades;

export default class UnidadeRepository {
  update(unidade){
    if(!(unidade instanceof Unidade)){
      throw new Error('Objeto não é do tipo Unidade!');
    }
    return table.put(unidade)
  }
}
