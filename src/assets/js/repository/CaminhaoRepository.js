import Vue from 'vue'
import QueueItem from "../dbModel/QueueItem";
import Caminhao from "../dbModel/Caminhao";

let table = Vue.prototype.db.caminhoes;
export default class CaminhaoRepository {

  getById(id){
    return table.get({id: id});
  };

  getAllBy(){

  };

  getAll(){
    return table.orderBy('date');
  };

  /*save(item){
    if(!(item instanceof QueueItem)){
      throw new Error('Objeto não é do tipo QueueItem!');
    }

    item.date = new Date();
    return table.add(item);
  };*/

  update(caminhao){
    if(!(caminhao instanceof Caminhao)){
      throw new Error('Objeto não é do tipo Caminhao!');
    }
    return table.put(caminhao)
  };

  deleteById(id){
    return table.delete(id);
  }
}
