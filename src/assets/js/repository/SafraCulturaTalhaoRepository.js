import Vue from 'vue'
import SafraCulturaTalhao from "../dbModel/SafraCulturaTalhao";
import BaseRepository from "./BaseRepository";

export default class SafraCulturaTalhaoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db.safra_culturas_talhoes, SafraCulturaTalhao);
  }
}
