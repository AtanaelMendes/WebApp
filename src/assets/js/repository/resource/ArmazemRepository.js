import Vue from 'vue'
import BaseRepository from "./BaseRepository";
import Armazem from "../../dbModel/Armazem";
import EntregaNegocioRepository from "./EntregaNegocioRepository";
import NegocioCulturaRepository from "./NegocioCulturaRepository";
import NegocioCulturaArmazemRepository from "./NegocioCulturaArmazemRepository";

export default class ArmazemRepository extends BaseRepository{
  #entregaNegocioRepository;
  #negocioCulturaRepository;
  #negocioCulturaArmazemRepository;

  constructor() {
    super(Vue.prototype.db_resources.armazens, Armazem);
    this.entregaNegocioRepository = new EntregaNegocioRepository();
    this.negocioCulturaRepository = new NegocioCulturaRepository();
    this.negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
  }

  async getAllByEntrega(entregaId){
    let armazens = await super.getAll();
    let entregasNegocios = await this.entregaNegocioRepository.getAllByEntregaId(entregaId);
    let negociosCulturas = await this.negocioCulturaRepository.getAll();
    let negociosCulturasArmazens = await this.negocioCulturaArmazemRepository.getAll();

    console.log('armazens');
    console.log(armazens);

    negociosCulturas = negociosCulturas.filter(negocioCultura => {
      let index = entregasNegocios.findIndex(entregaNegocio => entregaNegocio.negocio_cultura_id === negocioCultura.id);
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

    console.log('armazens_filtrado');
    console.log(armazens);

    return armazens;
  }

  /*async getAllFree(){
    let caminhoes = await this.table.toArray();
    let entregasEmProcesso = await this.entregaRepository.getCarregandoAndNoArmazem();
    let entregasQueue = await this.entregasQueue.listByType(EntregasQueue.NOVA_ENTREGA);

    entregasEmProcesso.forEach(entrega => {
      let index = caminhoes.findIndex(item => item.id === entrega.caminhao_id);
      if(index > -1){
        caminhoes.splice(index, 1)
      }
    });

    entregasQueue.forEach(entregaQueue => {
      let index = caminhoes.findIndex(item => item.id === entregaQueue.request.body.caminhao_id);
      if(index > -1){
        caminhoes.splice(index, 1)
      }
    });

    return caminhoes;
  }*/
}
