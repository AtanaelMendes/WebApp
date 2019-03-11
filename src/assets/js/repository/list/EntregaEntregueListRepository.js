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

  delete(id){
    return this.table.delete(id);
  }

  clearTable(){
    return this.table.clear();
  }
}
