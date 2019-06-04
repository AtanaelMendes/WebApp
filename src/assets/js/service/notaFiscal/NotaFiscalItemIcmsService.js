import NotaFiscalItemIcmsAPI from "../../api/notaFiscal/NotaFiscalItemIcmsAPI";

export default class NotaFiscalItemIcmsService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemIcmsAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemIcmsAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemIcmsAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
