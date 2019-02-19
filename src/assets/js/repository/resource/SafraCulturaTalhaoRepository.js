import Vue from 'vue'
import SafraCulturaTalhao from "../../dbModel/SafraCulturaTalhao";
import BaseRepository from "./BaseRepository";

export default class SafraCulturaTalhaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.safra_culturas_talhoes, SafraCulturaTalhao);
  }

  getBySafraCultura(safraCulturaId){
    return this.table.where('safra_cultura_id').equals(safraCulturaId).toArray();
  }
}
