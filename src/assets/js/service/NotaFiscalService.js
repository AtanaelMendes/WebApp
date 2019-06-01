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
  createNotaFiscal(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.createNotaFiscal(params).then(response => {
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
  listNaturezaOperacao(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.listNaturezaOperacao(notaFiscalId).then(response => {
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

}
