import Vue from 'vue'
import Area from "../../dbModel/Area";
import BaseRepository from "./BaseRepository";

export default class AreaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.areas, Area);
  }

}
