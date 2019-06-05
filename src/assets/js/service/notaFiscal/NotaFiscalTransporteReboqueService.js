import NotaFiscalTransporteReboqueAPI from "../../api/notaFiscal/NotaFiscalTransporteReboqueAPI";

export default class NotaFiscalTransporteReboqueService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteReboqueAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteReboqueAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteReboqueAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
