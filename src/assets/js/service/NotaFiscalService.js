import NotaFiscalAPI from "../api/NotaFiscalAPI";

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

}
