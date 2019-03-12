import CfopAPI from "../api/CfopAPI";
import CfopRepository from "../repository/resource/CfopRepository";

export default class CfopService{
  #cfopRepository;

  constructor() {
    this.cfopRepository = new CfopRepository();
  }

  listCfops() {
    return new Promise((resolve, reject) => {
      CfopAPI.listCfops().then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getCfopByNumero(numero) {
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        CfopAPI.getByNumero(numero).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
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
