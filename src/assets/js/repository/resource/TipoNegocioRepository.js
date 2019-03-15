import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import TipoNegocio from "../../dbModel/TipoNegocio";

export default class TipoNegocioRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.tipos_negocios, TipoNegocio);
  }
}
