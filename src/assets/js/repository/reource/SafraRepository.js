import Vue from 'vue'
import Safra from "../../dbModel/Safra";
import BaseRepository from "./BaseRepository";

export default class SafraRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.safras, Safra);
  }
}
