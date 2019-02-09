import Vue from 'vue'
import Unidade from "../dbModel/Unidade";
import BaseRepository from "./BaseRepository";

export default class UnidadeRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db.unidades, Unidade);
  }
}
