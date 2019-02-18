import Vue from 'vue'
import Caminhao from "../../dbModel/Caminhao";
import BaseRepository from "./BaseRepository";
import EntregaRepository from "./EntregaRepository";
import EntregasQueue from "../../queue/EntregasQueue";

export default class CaminhaoRepository extends BaseRepository{
  #entregaRepository;
  #entregasQueue;

  constructor() {
    super(Vue.prototype.db_resources.caminhoes, Caminhao);
    this.entregaRepository = new EntregaRepository();
    this.entregasQueue = new EntregasQueue();
  }

  async getAllFree(){
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
  }
}
