import Vue from 'vue'

export default class EntregaNoArmazemListRepository{
  #table;

  constructor() {
    this.table = Vue.prototype.db_lists.entregas_no_armazem;
  }

  update(entrega){
    this.table.put(entrega)
  }

  getAll(){
    return this.table.toArray();
  }

  clearTable(){
    return this.table.clear();
  }
}
