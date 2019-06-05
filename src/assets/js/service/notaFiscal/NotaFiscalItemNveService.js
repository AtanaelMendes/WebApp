import NotaFiscalItemNveAPI from "../../api/notaFiscal/NotaFiscalItemNveAPI";

export default class NotaFiscalItemNveService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemNveAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemNveAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemNveAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
