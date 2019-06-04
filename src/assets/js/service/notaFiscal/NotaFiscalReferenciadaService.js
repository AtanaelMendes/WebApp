import NotaFiscalReferenciadaAPI from "../../api/notaFiscal/NotaFiscalReferenciadaAPI";

export default class NotaFiscalReferenciadaService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalReferenciadaAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalReferenciadaAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalReferenciadaAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
