import Vue from 'vue'

let table;
export default class QueueApiIdRelationsRepository {
  constructor() {
    table = Vue.prototype.db_primary.queue_api_id_relations;
  };

  getByLocalId(local_id){
    return table.get({local_id: local_id});
  }

  getByApiIdId(api_id){
    return table.get({api_id: api_id});
  }

  save(local_id, api_id){
    return table.put({local_id: local_id, api_id: api_id});
  }

  deleteByLocalId(local_id){
    return table.delete(local_id);
  }

  deleteByApiId(api_id){
    return table.get({api_id: api_id}).then(item => {
      return table.delete(item.id);
    })
  }

  deleteAll(){
    return table.clear();
  }
}
