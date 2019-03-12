import { Loading, Dialog } from 'quasar'
import ArmazemAPI from "../../api/ArmazemAPI";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";

export default class ArmazemService{
  #produtorId;
  #armazemRepository;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
    this.armazemRepository = new ArmazemRepository();
  }

  listArmazens() {
    console.log('listArmazens')
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        ArmazemAPI.listArmazens(this.produtorId).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      }else{
        this.armazemRepository.getAll().then(armazens => {
          resolve(armazens);
        }).catch(error => {
          reject(error)
        })
      }
    });
  }

  listArmazensByEntrega(entregaId) {
    console.log('listArmazensByEntrega')
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        ArmazemAPI.listArmazensByEntrega(entregaId, this.produtorId).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error);
        })
      }else{
        this.armazemRepository.getAllByEntrega(entregaId).then(armazens => {
          resolve(armazens);
        }).catch(error => {
          reject(error);
        })
      }
    });
  }
}
