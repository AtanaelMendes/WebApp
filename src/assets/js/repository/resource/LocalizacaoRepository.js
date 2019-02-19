import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Localizacao from "../../dbModel/Localizacao";

export default class LocalizacaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.localizacoes, Localizacao);
  }
}
