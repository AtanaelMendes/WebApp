import Vue from 'vue'

export default class EntregaViewRepository{
  #table;

  constructor() {
    this.table = Vue.prototype.db_lists.entrega_view;
  }

  update(entrega){
    this.table.put(entrega)
  }

  get(id){
    return this.table.get(id);
  }

  getAll(){
    return this.table.toArray();
  }

  clearTable(){
    return this.table.clear();
  }
}
