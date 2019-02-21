import PesagemAPI from "../../api/PesagemAPI";
import EntregasQueue from "../../queue/EntregasQueue";

export default class PesagemService {
  #entregasQueue;

  constructor() {
    this.entregasQueue = new EntregasQueue();
  }

  savePesagem(entregaId, pesagem){
    return new Promise((resolve, reject) => {
      PesagemAPI.save(pesagem, entregaId).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject();
        }
      }).catch(error => {
        if(!navigator.onLine){
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
        resolve(response.data)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

}
