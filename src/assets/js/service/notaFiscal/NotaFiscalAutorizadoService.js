import NotaFiscalAutorizadoAPI from "../../api/notaFiscal/NotaFiscalAutorizadoAPI";

export default class NotaFiscalAutorizadoService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAutorizadoAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalAutorizadoAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalAutorizadoAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
