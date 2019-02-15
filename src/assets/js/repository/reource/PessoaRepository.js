import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Pessoa from "../../dbModel/Pessoa";

export default class PessoaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.pessoas, Pessoa);
  }
}
