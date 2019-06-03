import NotaFiscalItemPisAPI from "../../api/notaFiscal/NotaFiscalItemPisAPI";

export default class NotaFiscalItemPisService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemPisAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemPisAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemPisAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
