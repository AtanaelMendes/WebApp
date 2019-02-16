import Vue from 'vue'

export default class EntregaEntregueListRepository{
  #table;

  constructor() {
    this.table = Vue.prototype.db_lists.entregas_entregue;
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
