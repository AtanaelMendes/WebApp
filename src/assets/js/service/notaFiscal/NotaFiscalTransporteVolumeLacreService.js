import NotaFiscalTransporteVolumeLacreAPI from "../../api/notaFiscal/NotaFiscalTransporteVolumeLacreAPI";

export default class NotaFiscalTransporteVolumeLacreService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteVolumeLacreAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteVolumeLacreAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteVolumeLacreAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
