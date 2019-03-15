import Vue from 'vue'
import UnidadeAPI from "../api/UnidadeAPI";
import UnidadeRepository from "../repository/resource/UnidadeRepository";

export default class UnidadeMedidaService{
  #unidadeRepository;

  constructor() {
    this.unidadeRepository = new UnidadeRepository();
  }

  listUnidadesMedida(){
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        UnidadeAPI.getUnidadesMedida().then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      }else{
        this.unidadeRepository.getUnidadesMedida().then(unidades => {
          resolve(unidades);
        }).catch(error => {
          reject(error);
        })
      }
    });
  }

  listUnidadesArea(){
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        UnidadeAPI.getUnidadesArea().then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      }else{
        this.unidadeRepository.getUnidadesArea().then(unidades => {
          resolve(unidades);
        }).catch(error => {
          reject(error);
        })
      }
    });
  }

}
