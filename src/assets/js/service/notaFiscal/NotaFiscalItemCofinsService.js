import NotaFiscalItemCofinsAPI from "../../api/notaFiscal/NotaFiscalItemCofinsAPI";

export default class NotaFiscalItemCofinsService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemCofinsAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemCofinsAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemCofinsAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
