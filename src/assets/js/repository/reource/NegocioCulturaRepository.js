import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import NegocioCultura from "../../dbModel/NegocioCultura";

export default class NegocioCulturaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.negocios_culturas, NegocioCultura);
  }
}
