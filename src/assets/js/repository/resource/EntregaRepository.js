import Vue from 'vue';
import BaseRepository from "./BaseRepository";
import Entrega from "../../dbModel/Entrega";

export default class EntregaRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.entregas, Entrega);
  }

  getByCaminhao(caminhao_id){
    return this.table.where({caminhao_id: caminhao_id});
  }

  getByCaminhaoAndStatus(caminhao_id, status){
    return this.table.where({caminhao_id: caminhao_id, status: status});
  }

  getCarregandoAndNoArmazem(){
    return this.table.where('status').anyOf('Carregando', 'No Armazem').toArray();
  }
}
