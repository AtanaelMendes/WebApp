import Vue from 'vue'
import Unidade from "../../dbModel/Unidade";
import BaseRepository from "./BaseRepository";

export default class UnidadeRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.unidades, Unidade);
  }

  getUnidadesArea(){
    return this.table.filter(unidade => unidade.is_area === true).toArray();
  }

  getUnidadesMedida(){
    return this.table.filter(unidade => unidade.is_medida === true).toArray();
  }
}
