import Vue from 'vue'
import Talhao from "../../dbModel/Talhao";
import BaseRepository from "./BaseRepository";

export default class TalhaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.talhoes, Talhao);
  }
}
