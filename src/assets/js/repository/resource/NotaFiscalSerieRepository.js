import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import NotaFiscalSerie from "../../dbModel/NotaFiscalSerie";

export default class NotaFiscalSerieRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.notas_fiscais_series, NotaFiscalSerie);
  }
}
