import NotaFiscalSerieAPI from "../../api/notaFiscal/NotaFiscalSerieAPI";

export default class NotaFiscalSerieService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalSerieAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(id, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalSerieAPI.update(id, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(id) {
    return new Promise((resolve, reject) => {
      NotaFiscalSerieAPI.delete(id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  options() {
    return new Promise((resolve, reject) => {
      NotaFiscalSerieAPI.options().then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
