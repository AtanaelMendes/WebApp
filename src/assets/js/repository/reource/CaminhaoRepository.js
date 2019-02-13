import Vue from 'vue'
import Caminhao from "../../dbModel/Caminhao";
import BaseRepository from "./BaseRepository";
import EntregaRepository from "./EntregaRepository";

export default class CaminhaoRepository extends BaseRepository{
  #entregaRepository;

  constructor() {
    super(Vue.prototype.db_resources.caminhoes, Caminhao);
    this.entregaRepository = new EntregaRepository();
  }

  async getAllFree(){
    let caminhoes = await this.table.toArray()
    let entregasEmProcesso = await this.entregaRepository.getCarregandoAndNoArmazem();

    entregasEmProcesso.forEach(entrega => {
      let index = caminhoes.findIndex(item => item.id === entrega.caminhao_id)
      if(index > -1){
        caminhoes.splice(index, 1)
      }
    });

    return caminhoes;
  }
}
