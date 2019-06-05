import NotaFiscalObservacaoAPI from "../../api/notaFiscal/NotaFiscalObservacaoAPI";

export default class NotaFiscalObservacaoService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalObservacaoAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalObservacaoAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalObservacaoAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
