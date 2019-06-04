import NotaFiscalTransporteVolumeAPI from "../../api/notaFiscal/NotaFiscalTransporteVolumeAPI";

export default class NotaFiscalTransporteReboqueService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteVolumeAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteVolumeAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalTransporteVolumeAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
