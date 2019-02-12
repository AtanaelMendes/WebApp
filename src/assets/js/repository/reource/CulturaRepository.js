import Vue from 'vue'
import Cultura from "../../dbModel/Cultura";
import BaseRepository from "./BaseRepository";

export default class CulturaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.culturas, Cultura);
  }
}
