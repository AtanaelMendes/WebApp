import Vue from 'vue';
import NotaFiscalAPI from "../api/NotaFiscalAPI";
import NotaFiscalSerieRepository from "../repository/resource/NotaFiscalSerieRepository";

export default class NotaFiscalService {
  #notaFiscalSerieRepository;

  constructor() {
    this.notaFiscalSerieRepository = new NotaFiscalSerieRepository();
  }

  getNotaFiscalItemById(id){
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.getNotaFiscalItemById(id).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listSeries(){
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        NotaFiscalAPI.listSeries().then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error);
        })
      }else{
        this.notaFiscalSerieRepository.getAll().then(notasFiscaisSeries => {
          resolve(notasFiscaisSeries);
        }).catch(error => {
          reject(error);
        })
      }
    });
  }
}
