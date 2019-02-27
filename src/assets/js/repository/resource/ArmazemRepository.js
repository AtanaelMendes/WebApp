import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Armazem from "../../dbModel/Armazem";
import NegocioCulturaRepository from "./NegocioCulturaRepository";
import NegocioCulturaArmazemRepository from "./NegocioCulturaArmazemRepository";
import NegocioCulturaMovimentoRepository from "./NegocioCulturaMovimentoRepository";

export default class ArmazemRepository extends BaseRepository{
  #negocioCulturaMovimentoRepository;
  #negocioCulturaRepository;
  #negocioCulturaArmazemRepository;

  constructor() {
    super(Vue.prototype.db_resources.armazens, Armazem);
    this.negocioCulturaMovimentoRepository = new NegocioCulturaMovimentoRepository();
    this.negocioCulturaRepository = new NegocioCulturaRepository();
    this.negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
  }

  async getAllByEntrega(entregaId){
    let armazens = await super.getAll();
    let negocioCulturasMovimentos = await this.negocioCulturaMovimentoRepository.getAllByEntregaId(entregaId);
    let negociosCulturas = await this.negocioCulturaRepository.getAll();
    let negociosCulturasArmazens = await this.negocioCulturaArmazemRepository.getAll();

    negociosCulturas = negociosCulturas.filter(negocioCultura => {
      let index = negocioCulturasMovimentos.findIndex(negocioCulturaMovimento => negocioCulturaMovimento.negocio_cultura_id === negocioCultura.id);
      return index > -1;
    });

    negociosCulturasArmazens = negociosCulturasArmazens.filter(negocioCulturaArmazem => {
      let index = negociosCulturas.findIndex(negocioCultura => negocioCultura.id === negocioCulturaArmazem.negocio_cultura_id);
      return index > -1;
    });

    armazens = armazens.filter(armazem => {
      let index = negociosCulturasArmazens.findIndex(negocioCulturaArmazem => negocioCulturaArmazem.armazem_id === armazem.id);
      return index > -1;
    });

    return armazens;
  }
}
