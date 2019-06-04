import NotaFiscalDuplicataAPI from "../../api/notaFiscal/NotaFiscalDuplicataAPI";

export default class NotaFiscalDuplicataService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalDuplicataAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalDuplicataAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalDuplicataAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
