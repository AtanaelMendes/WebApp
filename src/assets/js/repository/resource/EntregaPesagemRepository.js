import Vue from 'vue';
import BaseRepository from "./BaseRepository";
import EntregaPesagem from "../../dbModel/EntregaPesagem";

export default class EntregaPesagemRepository extends BaseRepository {

  constructor() {
    super(Vue.prototype.db_resources.entregas_pesagens, EntregaPesagem);
  }

  getAllSortedByEmissaoDesc(entregaId){
    return this.table.where({entrega_id:entregaId}).reverse().sortBy('emissao');
  }
}
