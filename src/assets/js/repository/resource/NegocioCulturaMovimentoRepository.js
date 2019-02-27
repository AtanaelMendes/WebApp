import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import NegocioCulturaMovimento from "../../dbModel/NegocioCulturaMovimento";

export default class NegocioCulturaMovimentoRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.negocios_culturas_movimentos, NegocioCulturaMovimento);
  }

  /*ggetAllByNegocioCulturaId(negocioCulturaId){
    return this.table.where({negocio_cultura_id:negocioCulturaId}).toArray();
  }

  getAllByEntregaId(entregaId){
    return this.table.where({entrega_id:entregaId}).toArray();
  }*/
}
