import NotaFiscalAPI from "../../api/notaFiscal/NotaFiscalAPI";

export default class NotaFiscalService {

  listNotasFiscaisWithFilter(filter) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.listNotasFiscaisWithFilter(filter).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  };

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(NotaFiscalId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.update(NotaFiscalId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(NotaFiscalId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.delete(NotaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  duplicar(NotaFiscalId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.duplicar(NotaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };


}
