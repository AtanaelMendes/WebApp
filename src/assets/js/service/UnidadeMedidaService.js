import UnidadeAPI from "../api/UnidadeAPI";
import UnidadeRepository from "../repository/reource/UnidadeRepository";

export default class UnidadeMedidaService{
  #unidadeRepository;

  constructor() {
    this.unidadeRepository = new UnidadeRepository();
  }

  listUnidadesMedida(){
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        UnidadeAPI.getUnidadesMedida().then(response => {
          resolve(response.data);
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
      if(navigator.onLine) {
        UnidadeAPI.getUnidadesArea().then(response => {
          resolve(response.data);
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
