import Vue from 'vue';
import PesagemAPI from "../../api/PesagemAPI";
import EntregasQueue from "../../queue/EntregasQueue";

export default class PesagemService {
  #entregasQueue;

  constructor() {
    this.entregasQueue = new EntregasQueue();
  }

  getPesagem(entregaId, id){
    return new Promise((resolve, reject) => {
      PesagemAPI.get(id, entregaId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  savePesagem(entregaId, pesagem){
    return new Promise((resolve, reject) => {
      PesagemAPI.save(pesagem, entregaId).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        if(!Vue.prototype.serverStatus.isUp){
          this.entregasQueue.add(error.config, EntregasQueue.INFORMAR_PESAGEM);
          resolve();
        }else{
          reject(error.response)
        }
      })
    });
  }

  updatePesagem(id, entregaId, pesagem){
    return new Promise((resolve, reject) => {
      PesagemAPI.update(id, entregaId, pesagem).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        if(!Vue.prototype.serverStatus.isUp){
          this.entregasQueue.add(error.config, EntregasQueue.INFORMAR_PESAGEM);
          resolve();
        }else{
          reject(error.response)
        }
      })
    });
  }

  deletePesagem(entregaId, id){
    return new Promise((resolve, reject) => {
      PesagemAPI.delete(id, entregaId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

}
