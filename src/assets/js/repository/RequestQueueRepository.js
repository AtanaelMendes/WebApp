import Vue from 'vue'
import QueueItem from "../dbModel/QueueItem";

let table = Vue.prototype.db.request_queue;
export default class RequestQueueRepository {

  getBy(){

  };

  getAllBy(){

  };

  getAll(){
    return table.orderBy('date');
  };

  save(item){
    if(!(item instanceof QueueItem)){
      throw new Error('Objeto não é do tipo QueueItem!');
    }

    item.date = new Date();
    return table.add(item);
  };

  update(){

  };

  deleteById(id){
    return table.delete(id);
  }
}
