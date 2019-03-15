import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Motorista from "../../dbModel/Motorista";

export default class MotoristaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.motoristas, Motorista);
  }
}
