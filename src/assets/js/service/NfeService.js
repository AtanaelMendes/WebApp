import NfeAPI from "../api/NfeAPI";

export default class NotaFiscalService {

  criar(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NfeAPI.criar(notaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  assinar(notaFiscalId, continuar = false) {
    return new Promise((resolve, reject) => {
      NfeAPI.assinar(notaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  enviarSincrono(notaFiscalId, continuar = false) {
    return new Promise((resolve, reject) => {
      NfeAPI.enviarSincrono(notaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  consultar(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NfeAPI.consultar(notaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  mail(notaFiscalId, para=null) {
    return new Promise((resolve, reject) => {
      NfeAPI.mail(notaFiscalId, {para: para}).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  cancelar(notaFiscalId, justificativa) {
    return new Promise((resolve, reject) => {
      NfeAPI.cancelar(notaFiscalId, {justificativa: justificativa}).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  inutilizar(notaFiscalId, justificativa) {
    return new Promise((resolve, reject) => {
      NfeAPI.inutilizar(notaFiscalId, {justificativa: justificativa}).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  danfe(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NfeAPI.danfe(notaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  xml(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NfeAPI.xml(notaFiscalId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

}
