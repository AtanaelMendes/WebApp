import { Loading, Dialog } from 'quasar'
import MotoristaAPI from "../../api/MotoristaAPI";

export default class MotoristaService{
  #produtorId;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
  }

  listMotoristas() {
    return new Promise((resolve, reject) => {
      MotoristaAPI.listMotoristas(this.produtorId).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
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
