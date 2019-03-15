import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import NegocioCulturaArmazem from "../../dbModel/NegocioCulturaArmazem";

export default class NegocioCulturaArmazemRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.negocios_culturas_armazens, NegocioCulturaArmazem);
  }

  getAllByNegocioCultura(negocioCulturaId){
    return this.table.where({negocio_cultura_id: negocioCulturaId}).toArray();
  }
}
