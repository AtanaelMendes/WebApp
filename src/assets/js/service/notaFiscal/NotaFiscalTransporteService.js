import NotaFiscalTransporteAPI from "../../api/notaFiscal/NotaFiscalTransporteAPI";

export default class NotaFiscalTransporteService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
