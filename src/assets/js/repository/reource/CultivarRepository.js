import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Cultivar from "../../dbModel/Cultivar";

export default class CultivarRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.cultivares, Cultivar);
  }
}
