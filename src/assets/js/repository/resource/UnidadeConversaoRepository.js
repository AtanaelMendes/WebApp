import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import UnidadeConversao from "../../dbModel/UnidadeConversao";

export default class UnidadeConversaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.unidades_conversoes, UnidadeConversao);
  }

  getByOrigemAndDestino(id_origem, id_destino){
    return this.table.where({origem_id: id_origem, destino_id:id_destino}).first();
  }
}
