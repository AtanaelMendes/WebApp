import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Marca from "../../dbModel/Marca";

export default class MarcaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.marcas, Marca);
  }
}
