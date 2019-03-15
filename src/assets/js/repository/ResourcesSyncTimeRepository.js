import Vue from 'vue'

export default class ResourcesSyncTimeRepository {
  #table;

  constructor(){
    this.table = Vue.prototype.db_primary.resources_sync_time;
  }

  async isEmpty(){
    return await this.table.count() === 0;
  }

  getAll(){
    return this.table.toArray()
  }

  getByTableName(tableName){
    return this.table.get({table_name: tableName});
  }

  put(tableName, time){
    return this.table.put({table_name: tableName, last_update_registry: time});
  }
}
