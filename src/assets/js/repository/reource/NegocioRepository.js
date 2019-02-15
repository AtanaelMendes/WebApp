import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Negocio from "../../dbModel/Negocio";

export default class NegocioRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.negocios, Negocio);
  }
}
