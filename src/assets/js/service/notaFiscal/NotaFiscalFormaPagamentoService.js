import NotaFiscalFormaPagamentoAPI from "../../api/notaFiscal/NotaFiscalFormaPagamentoAPI";

export default class NotaFiscalFormaPagamentoService {

  create(params) {
    return new Promise((resolve, reject) => {
      NotaFiscalFormaPagamentoAPI.create(params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  update(itemId, params) {
    return new Promise((resolve, reject) => {
      NotaFiscalFormaPagamentoAPI.update(itemId, params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

  delete(itemId) {
    return new Promise((resolve, reject) => {
      NotaFiscalFormaPagamentoAPI.delete(itemId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  };

}
