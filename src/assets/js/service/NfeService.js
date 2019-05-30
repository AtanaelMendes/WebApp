import NfeAPI from "../api/NfeAPI";
import { Notify } from 'quasar'
import { Loading } from 'quasar'
import { Dialog } from 'quasar'

export default class NotaFiscalService {

  notificaErro(mensagem) {
    Notify.create({
      type: 'negative',
      message: mensagem
    });
  };

  criar(notaFiscalId, continuar = false) {
    Loading.show();
    return new Promise((resolve, reject) => {
      NfeAPI.criar(notaFiscalId).then(response => {
        if (response.status === 200) {
          if (!continuar) {
            Loading.hide();
          }
          Notify.create({type: 'positive', message: 'Arquivo da Nfe criado!'});
          if (continuar) {
            this.assinar(notaFiscalId, continuar);
          }
          resolve(response.data);
        } else {
          Loading.hide();
          console.log(response);
          Notify.create({type: 'negative', message: 'Erro ao criar arquivo da Nfe!'});
          reject(response);
        }
      }).catch(error => {
        Loading.hide();
        console.log(error);
        Notify.create({type: 'negative', message: error.response.data.message});
        reject(error);
      });
    });
  };

  assinar(notaFiscalId, continuar = false) {
    Loading.show();
    return new Promise((resolve, reject) => {
      NfeAPI.assinar(notaFiscalId).then(response => {
        if (response.status === 200) {
          if (!continuar) {
            Loading.hide();
          }
          Notify.create({type: 'positive', message: 'Arquivo da Nfe assinado!'});
          if (continuar) {
            this.enviarSincrono(notaFiscalId, continuar);
          }
          resolve(response.data);
        } else {
          Loading.hide();
          console.log(response);
          Notify.create({type: 'negative', message: 'Erro ao assinar arquivo da Nfe!'});
          reject(response);
        }
      }).catch(error => {
        Loading.hide();
        console.log(error);
        Notify.create({type: 'negative', message: error.response.data.message});
        reject(error);
      });
    });
  };

  enviarSincrono(notaFiscalId, continuar = false) {
    Loading.show();
    return new Promise((resolve, reject) => {
      NfeAPI.enviarSincrono(notaFiscalId).then(response => {
        if (response.status === 200) {
          if (!continuar) {
            Loading.hide();
          }
          Notify.create({type: 'positive', message: 'NFe Autorizada!'});
          if (continuar) {
            this.danfe(notaFiscalId);
            this.mail(notaFiscalId);
          }
          resolve(response.data);
        } else {
          Loading.hide();
          console.log(response);
          Notify.create({type: 'negative', message: 'Erro ao enviar NFe para Sefaz!'});
          reject(response);
        }
      }).catch(error => {
        Loading.hide();
        console.log(error);
        Notify.create({type: 'negative', message: error.response.data.message});
        reject(error);
      });
    });
  };

  consultar(notaFiscalId) {
    Loading.show();
    return new Promise((resolve, reject) => {
      NfeAPI.consultar(notaFiscalId).then(response => {
        Loading.hide();
        if (response.status === 200) {
          var type = 'positive';
          if (response.data.status != 'Autorizada') {
            type = 'negative';
          }
          Notify.create({type: type, message: response.data.message});
          resolve(response.data);
        } else {
          console.log(response);
          Notify.create({type: 'negative', message: 'Erro ao consultar NFe na Sefaz!'});
          reject(response);
        }
      }).catch(error => {
        Loading.hide();
        console.log(error);
        Notify.create({type: 'negative', message: error.response.data.message});
        reject(error);
      });
    });
  };

    mail(notaFiscalId, para=null) {
      Loading.show();
      return new Promise((resolve, reject) => {
        NfeAPI.mail(notaFiscalId, {para: para}).then(response => {
          Loading.hide();
          console.log(response.status);
          if (response.status === 200) {
            var message = 'Email enviado para: ';
            if (typeof response.data.para !== 'undefined') {
              message += response.data.para.join(', ');
            }
            Notify.create({type: 'positive', message: message});
            resolve(response.data);
          } else {
            console.log(response);
            Notify.create({type: 'negative', message: 'Erro ao consultar NFe na Sefaz!'});
            reject(response);
          }
        }).catch(error => {
          Loading.hide();
          console.log(error);
          var message = "Erro ao enviar e-mail!";
          if (typeof error.response.data.para !== 'undefined') {
            message = error.response.data.para.join(', ');
          }
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message;
          }
          Notify.create({type: 'negative', message: message});
          reject(error);
        });
      });
    }

  mailPerguntar(notaFiscalId) {
    Dialog.create({
        title: 'E-mail NF-e',
        message: 'Digite o endereço para o qual você deseja enviar esta NF-e. Deixe em branco para utilizar o endereço que no cadastro.',
        cancel: true,
        color: 'secondary',
        prompt: {
          model: '',
          type: 'email' // optional
        },
    }).then(para => {
      this.mail(notaFiscalId, para)
    }).catch(() => {
      // Picked "Cancel" or dismissed
    })
  };

  cancelar(notaFiscalId) {
    Dialog.create({
        title: 'Justificativa',
        message: 'Digite a justificativa para o cancelamento desta NF-e.',
        cancel: true,
        color: 'secondary',
        prompt: {
          model: '',
          type: 'email' // optional
        },
    }).then(justificativa => {
      Loading.show();
      return new Promise((resolve, reject) => {
        NfeAPI.cancelar(notaFiscalId, {justificativa: justificativa}).then(response => {
          Loading.hide();
          if (response.status === 200) {
            Notify.create({type: 'positive', message: 'Nfe Cancelada!'});
            resolve(response.data);
          } else {
            Notify.create({type: 'negative', message: 'Erro ao cancelar NFe na Sefaz!'});
            reject(response);
          }
        }).catch(error => {
          Loading.hide();
          console.log(error);
          var message = "Erro ao cancelar NFe na Sefaz!";
          if (typeof error.response.data.justificativa !== 'undefined') {
            message = error.response.data.justificativa.join(', ');
          }
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message;
          }
          Notify.create({type: 'negative', message: message});
          reject(error);
        });
      });
    }).catch(() => {
      // Picked "Cancel" or dismissed
    })
  };

  inutilizar(notaFiscalId) {
    Dialog.create({
        title: 'Justificativa',
        message: 'Digite a justificativa para a inutilização desta NF-e.',
        cancel: true,
        color: 'secondary',
        prompt: {
          model: '',
          type: 'email' // optional
        },
    }).then(justificativa => {
      Loading.show();
      return new Promise((resolve, reject) => {
        NfeAPI.inutilizar(notaFiscalId, {justificativa: justificativa}).then(response => {
          Loading.hide();
          if (response.status === 200) {
            Notify.create({type: 'positive', message: 'Nfe Inutilizada!'});
            resolve(response.data);
          } else {
            Notify.create({type: 'negative', message: 'Erro ao Inutilizar NFe na Sefaz!'});
            reject(response);
          }
        }).catch(error => {
          Loading.hide();
          console.log(error);
          var message = "Erro ao inutilizar NFe na Sefaz!";
          if (typeof error.response.data.justificativa !== 'undefined') {
            message = error.response.data.justificativa.join(', ');
          }
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message;
          }
          Notify.create({type: 'negative', message: message});
          reject(error);
        });
      });
    }).catch(() => {
      // Picked "Cancel" or dismissed
    })
  };

  danfe(notaFiscalId) {
    Loading.show()
    return new Promise((resolve, reject) => {
      NfeAPI.danfe(notaFiscalId).then(response => {
        Loading.hide()
        if (response.status === 200) {
          const file = new Blob([response.data], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          Notify.create({type: 'positive', message: 'Danfe aberta!'});
          resolve(response.data);
        } else {
          console.log(response);
          Notify.create({type: 'negative', message: 'Erro ao abir Danfe!'});
          reject(response);
        }
      }).catch(error => {
        Loading.hide()
        console.log(error)
        var reader = new FileReader();
        reader.onload = function() {
          var res = JSON.parse(reader.result);
          Notify.create({type: 'negative', message: res.message});
        }
        reader.readAsText(error.response.data);
        reject(error);
      });
    });
  };

  xml(notaFiscalId) {
    return new Promise((resolve, reject) => {
      NfeAPI.xml(notaFiscalId).then(response => {
        if (response.status === 200) {
          const file = new Blob([response.data], {type: 'application/xml'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          Notify.create({type: 'positive', message: 'XML aberto!'});
          resolve(response.data);
        } else {
          console.log(response);
          Notify.create({type: 'negative', message: 'Erro ao abir XML!'});
          reject(response);
        }
      }).catch(error => {
        console.log(error);
        Notify.create({type: 'negative', message: error.response.data.message});
        reject(error);
      });
    });
  };

}
