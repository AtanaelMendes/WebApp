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

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
