import Vue from 'vue'
export default class AccountRepository {
  #table;

  constructor() {
    this.table = Vue.prototype.db_primary.account_info;
  }

  getFirst(){
    return this.table.get(1);
  }

  save(info){
    return this.table.add(info, 1)
  }

  update(info){
    return this.table.put(1, info)
  }
}
