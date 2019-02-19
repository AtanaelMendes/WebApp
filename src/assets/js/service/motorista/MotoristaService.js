import { Loading, Dialog } from 'quasar'
import MotoristaAPI from "../../api/MotoristaAPI";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";

export default class MotoristaService{
  #produtorId;
  #motoristaRepository;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
    this.motoristaRepository = new MotoristaRepository();
  }

  listMotoristas() {
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        MotoristaAPI.listMotoristas(this.produtorId).then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      }else{
        this.motoristaRepository.getAll().then(motoristas => {
          resolve(motoristas);
        }).catch(error => {
          reject(error);
        })
      }
    });
  }

  saveMotorista(motorista){
    return new Promise((resolve, reject) => {
      MotoristaAPI.saveMotorista(motorista, this.produtorId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }
}
