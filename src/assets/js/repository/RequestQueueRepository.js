import Vue from 'vue'
import QueueItem from "../dbModel/QueueItem";

let table;

export default class RequestQueueRepository {


  constructor() {
    table = Vue.prototype.db_primary.request_queue;
  };

  getById(id){
    return table.get({id: id});
  }

  getByGrouper(grouper){
    return table.where('grouper').equals(grouper);
  };

  getByUrl(url){
    return table.where('request.url').equals(url);
  }

  getByGrouperAndUrl(grouper, url){
    return table.where(['grouper', 'request.url']).equals([grouper, url]);
  }

  listByType(type){
    return table.where({'type':type}).toArray();
  }

  getByGrouperAndUrlAndMethod(grouper, url, method){
    return table.where({grouper: grouper, 'request.url': url}).filter(item => item.request.method === method);
  }

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
