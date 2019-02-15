import NotaFiscalAPI from "../api/NotaFiscalAPI";

export default class NotaFiscalService {
  #produtorId;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
  }

  getNotaFiscalItemById(id){
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.getNotaFiscalItemById(id, this.produtorId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  listSeries(){
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.listSeries(this.produtorId).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  }
}
