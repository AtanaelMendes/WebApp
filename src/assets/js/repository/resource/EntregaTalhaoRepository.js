import Vue from 'vue';
import BaseRepository from "./BaseRepository";
import EntregaTalhao from "../../dbModel/EntregaTalhao";

export default class EntregaTalhaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.entregas_talhoes, EntregaTalhao);
  }

  getByEntregaId(id){
    return this.table.where({entrega_id: id}).toArray();
  }
}
