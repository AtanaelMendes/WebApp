import Vue from 'vue'
import SafraCultura from "../dbModel/SafraCultura";
import BaseRepository from "./BaseRepository";

export default class SafraCulturaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db.safra_culturas, SafraCultura);
  }
}
