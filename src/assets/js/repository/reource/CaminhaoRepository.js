import Vue from 'vue'
import Caminhao from "../../dbModel/Caminhao";
import BaseRepository from "./BaseRepository";

export default class CaminhaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.caminhoes, Caminhao);
  }

}
