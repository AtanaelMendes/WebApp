import NotaFiscalLocalizacaoAPI from "../../api/notaFiscal/NotaFiscalLocalizacaoAPI";

export default class NotaFiscalLocalizacaoService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalLocalizacaoAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalLocalizacaoAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalLocalizacaoAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
