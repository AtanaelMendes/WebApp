import Vue from 'vue'
import Classificacao from "../../dbModel/Classificacao";
import BaseRepository from "./BaseRepository";

export default class ClassificacaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.classificacoes, Classificacao);
  }
}
