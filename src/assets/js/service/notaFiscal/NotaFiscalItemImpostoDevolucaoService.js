import NotaFiscalItemImpostoDevolucaoAPI from "../../api/notaFiscal/NotaFiscalItemImpostoDevolucaoAPI";

export default class NotaFiscalItemImpostoDevolucaoService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemImpostoDevolucaoAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemImpostoDevolucaoAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalItemImpostoDevolucaoAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
