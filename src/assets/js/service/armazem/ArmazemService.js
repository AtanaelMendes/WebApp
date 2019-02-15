import { Loading, Dialog } from 'quasar'
import ArmazemAPI from "../../api/ArmazemAPI";
const produtorId = localStorage.getItem('account.produtor_id');
export default class ArmazemService{
  #produtorId;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
  }

  listArmazens() {
    return new Promise((resolve, reject) => {
      ArmazemAPI.listArmazens(this.produtorId).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  }

  listArmazensByEntrega(entregaId) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.listArmazensByEntrega(entregaId, this.produtorId).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  }
}
