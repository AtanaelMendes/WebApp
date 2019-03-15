import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Cfop from "../../dbModel/Cfop";

export default class CfopRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.cfops, Cfop);
  }

  getByNumero(numero){
    return this.table.get({numero:numero});
  }
}
