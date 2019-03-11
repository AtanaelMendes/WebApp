import Vue from 'vue'

export default class EntregaNoArmazemListRepository{
  #table;

  constructor() {
    this.table = Vue.prototype.db_lists.entregas_no_armazem;
  }

  update(entrega){
    this.table.put(entrega)
  }

  getById(id){
    return this.table.get({id: id});
  }

  getAll(){
    return this.table.toArray();
  }

  delete(id){
    return this.table.delete(id);
  }

  clearTable(){
    return this.table.clear();
  }
}
