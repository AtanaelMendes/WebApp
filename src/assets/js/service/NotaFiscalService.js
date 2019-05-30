import NotaFiscalAPI from "../api/NotaFiscalAPI";
import NotaFiscalSerieAPI from "../api/NotaFiscalSerieAPI";

export default class NotaFiscalService {

  listNotasFiscaisWithFilter(filter) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.listNotasFiscaisWithFilter(filter).then(response => {
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
  getNotaFiscalById(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.getNotaFiscalById(notaFiscalId).then(response => {
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
  cretateNotaFiscal(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.cretateNotaFiscal(params).then(response => {
        if(response.status === 201){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  updateNotaFiscal(notaFiscalId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.updateNotaFiscal(params, notaFiscalId).then(response => {
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
  deleteNotaFiscal(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.deleteNotaFiscal(notaFiscalId).then(response => {
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
      NotaFiscalSerieAPI.listSeries().then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error);
      })
    });
  };

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
    })
  }

}
