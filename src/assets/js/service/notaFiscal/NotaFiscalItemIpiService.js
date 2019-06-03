import NotaFiscalItemIpiAPI from "../../api/notaFiscal/NotaFiscalItemIpiAPI";

export default class NotaFiscalItemIpiService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemIpiAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemIpiAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemIpiAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
