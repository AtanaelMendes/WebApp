import Vue from 'vue'

export default class EntregaCarregandoListRepository{
  #table;

  constructor() {
    this.table = Vue.prototype.db_lists.entregas_carregando;
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

  clearTable(){
    return this.table.clear();
  }
}
