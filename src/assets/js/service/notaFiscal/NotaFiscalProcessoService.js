import NotaFiscalProcessoAPI from "../../api/notaFiscal/NotaFiscalProcessoAPI";

export default class NotaFiscalProcessoService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalProcessoAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalProcessoAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalProcessoAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
