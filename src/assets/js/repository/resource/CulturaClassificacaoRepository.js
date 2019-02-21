import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import CulturaClassificacao from "../../dbModel/CulturaClassificacao";

export default class CulturaArmazemRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.culturas_classificacoes, CulturaClassificacao);
  }

  getAllByCultura(culturaId){
    return this.table.where({cultura_id: culturaId}).toArray();
  }
}
