import Vue from 'vue'
import Talhao from "../dbModel/Talhao";


let table = Vue.prototype.db.talhoes;

export default class TalhaoRepository {
  update(talhao){
    if(!(talhao instanceof Talhao)){
      throw new Error('Objeto não é do tipo Talhao!');
    }
    return table.put(talhao)
  }
}
