import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import EntregaNegocio from "../../dbModel/EntregaNegocio";

export default class EntregaNegocioRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.entregas_negocios, EntregaNegocio);
  }

  getAllByNegocioCulturaId(negocioCulturaId){
    return this.table.where({negocio_cultura_id:negocioCulturaId}).toArray();
  }
}
