import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Armazem from "../../dbModel/Armazem";

export default class ArmazemRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.armazens, Armazem);
  }

}
