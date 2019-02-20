import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import CfopAPI from "../api/CfopAPI";
import CfopRepository from "../repository/resource/CfopRepository";

export default class CfopService{
  #cfopRepository;

  constructor() {
    this.cfopRepository = new CfopRepository();
  }

  listCfops() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/cfop').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getCfopByNumero(numero) {
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        CfopAPI.getByNumero(numero).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      }else{
        this.cfopRepository.getByNumero(numero).then(cfop => {
          resolve(cfop);
        }).catch(()=>{
          reject();
        })
      }
    });
  }
}
