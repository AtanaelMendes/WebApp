import Vue from 'vue'
import EntregasQueue from "../../queue/EntregasQueue";
import EntregaCarregandoListItem from "../../model/entrega/EntregaCarregandoListItem";
import EntregaAPI from "../../api/EntregaAPI";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import EntregaNoArmazemListItem from "../../model/entrega/EntregaNoArmazemListItem";
import EntregaEntregueListItem from "../../model/entrega/EntregaEntregueListItem";
import EntregaCarregandoListItemBuilder from "../../queue/builder/EntregaCarregandoListItemBuilder";
import EntregaNoArmazemListItemBuilder from "../../queue/builder/EntregaNoArmazemListItemBuilder";
import EntregaEntregueListItemBuilder from "../../queue/builder/EntregaEntregueListItemBuilder";
import EntregaViewBuilder from "../../queue/builder/EntregaViewBuilder";
import EntregaRepository from "../../repository/resource/EntregaRepository";
import Entrega from "../../dbModel/Entrega";
import EntregaListItemBuilder from "../../model/entrega/builder/EntregaListItemBuilder";

export default class EntregaService{
  #entregasQueue;
  #entregaViewRepository;
  #entregaRepository;
  #entregaListItemBuilder;

  constructor() {
    this.entregasQueue = new EntregasQueue();
    this.entregaViewRepository = new EntregaViewRepository();
    this.entregaRepository = new EntregaRepository();
    this.entregaListItemBuilder = new EntregaListItemBuilder();
  }

  listEntregasCarregando(filter = null){
    return new Promise(async (resolve, reject) => {
      let entregas = null;
      let entregasCarregandoListItemBuilder = new EntregaCarregandoListItemBuilder();

      if(Vue.prototype.serverStatus.isUp){
        entregas = await EntregaAPI.listEntregasByStatus('carregando', filter).then(response => {
          if(response.status === 200){
            return resolve(response.data);
          }else{
            return reject(response);
          }
        })
      }else{
        entregas = await this.entregaRepository.getByStatus(Entrega.CARREANDO);

        entregas = await Promise.all(entregas.map(async entrega => {
          return this.entregaListItemBuilder.buildCarregandoListItem(entrega);
        }));
      }

      if(entregas === undefined){
        entregas = []
      }

      entregas = entregas.map(entrega => {
        return new EntregaCarregandoListItem(entrega)
      });

      let queueItens = await this.entregasQueue.listByType(EntregasQueue.NOVA_ENTREGA);

      for(let i = 0; i < queueItens.length; i++){
        let url = Vue.prototype.$axios.defaults.baseURL + '/entrega';
        let results = await this.entregasQueue.getByUrlAndMethod(url + '/queue::' + queueItens[i].id + '/enviar_entrega', 'put').toArray();

        if(results.length !== 0){
          queueItens.splice(i, 1);
        }
      }

      let queueEntregas = await Promise.all(queueItens.map(async queueItem => {
        return await entregasCarregandoListItemBuilder.build(queueItem);
      }));

      resolve(entregas.concat(queueEntregas));
    });
  };

  listEntregasNoArmazem(filter = null){
    return new Promise(async (resolve, reject) => {
      let entregas = null;
      let entregaNoArmazemListItemBuilder = new EntregaNoArmazemListItemBuilder();

      if(Vue.prototype.serverStatus.isUp){
        entregas = await EntregaAPI.listEntregasByStatus('no_armazem', filter).then(response => {
          if(response.status === 200){
            return resolve(response.data);
          }else{
            return reject(response);
          }
        })
      }else{
        entregas = await this.entregaRepository.getByStatus(Entrega.NO_ARMAZEM);

        entregas = await Promise.all(entregas.map(async entrega => {
          return this.entregaListItemBuilder.buildNoArmazemListItem(entrega);
        }));
      }

      if(entregas === undefined){
        entregas = []
      }

      entregas = entregas.map(entrega => {
        return new EntregaNoArmazemListItem(entrega)
      });

      let queueItens = await this.entregasQueue.listByType(EntregasQueue.ENVIAR_PARA_ARMAZEM);

      for(let i = 0; i < queueItens.length; i++){
        let url = Vue.prototype.$axios.defaults.baseURL + 'entrega';
        let results = await this.entregasQueue.getByUrlAndMethod(url + '/queue::' + queueItens[i].id + '/pesagem', 'post').toArray();

        if(results.length !== 0){
          queueItens.splice(i, 1);
        }
      }

      let queueEntregas = await Promise.all(queueItens.map(async queueItem => {
        return await entregaNoArmazemListItemBuilder.build(queueItem);
      }));

      resolve(entregas.concat(queueEntregas));
    });

  };

  listCargasEntregues(filter = null){
    return new Promise(async (resolve, reject) => {
      let entregas = null;
      let entregaEntregueListItemBuilder = new EntregaEntregueListItemBuilder();

      if(Vue.prototype.serverStatus.isUp){
        entregas = await EntregaAPI.listEntregasByStatus('entregue', filter).then(response => {
          if(response.status === 200){
            return resolve(response.data);
          }else{
            return reject(response);
          }
        })
      }else{
        entregas = await this.entregaRepository.getByStatus(Entrega.ENTREGUE);

        entregas = await Promise.all(entregas.map(async entrega => {
          return this.entregaListItemBuilder.buildEntregueListItem(entrega);
        }));
      }

      if(entregas === undefined){
        entregas = []
      }

      entregas = entregas.map(entrega => {
        return new EntregaEntregueListItem(entrega);
      });

      let queueItens = await this.entregasQueue.listByType(EntregasQueue.INFORMAR_PESAGEM);

      let queueEntregas = await Promise.all(queueItens.map(async queueItem => {
        return entregaEntregueListItemBuilder.build(queueItem)

      }));

      resolve(queueEntregas.concat(entregas));
    });
  };

  getEntregaById(id){
    return new Promise(async(resolve, reject) => {
      if(typeof id === 'string' && id.match("(queue::([0-9]*))")){
        let queueId = parseInt(id.match("(queue::([0-9]*))")[2]);
        let entregaViewBuilder = new EntregaViewBuilder();

        let entrega = await entregaViewBuilder.build(queueId);

        resolve(entrega);

      }else{
        if(Vue.prototype.serverStatus.isUp){
          EntregaAPI.getEntrega(id).then(response => {
            resolve(response.data);
          }).catch(error => {
            reject(new Error("Erro na API"))
          })
        }else{
          this.entregaViewRepository.get(id).then(entrega => {
            resolve(entrega)
          }).catch(() => {
            reject(new Error("Erro no BD"))
          })
        }
      }
    });
  };

  saveEntrega(entrega){
    return new Promise((resolve, reject) => {
      EntregaAPI.saveEntrega(entrega).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject();
        }
      }).catch(error => {
        if(!Vue.prototype.serverStatus.isUp){
          this.entregasQueue.add(error.config, EntregasQueue.NOVA_ENTREGA);
          resolve();
        }else{
          reject(error.response)
        }
      })
    });
  };

  sendEntregaToArmazen(entrega_id, params){
    return new Promise((resolve, reject) => {
      EntregaAPI.sendToArmazem(params, entrega_id).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }).catch(error => {
        if(!Vue.prototype.serverStatus.isUp){
          this.entregasQueue.add(error.config, EntregasQueue.ENVIAR_PARA_ARMAZEM);
          resolve();
        }else{
          reject(error.response)
        }
      })

    });
  };

  addNegocioToEntrega(entrega_id, negocio){
    return new Promise((resolve, reject) => {
      EntregaAPI.addNegocio(negocio, entrega_id).then(response => {
        if(response.status === 201) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  deleteNegocioOfEntrega(entrega_id, negocio_id){
    return new Promise((resolve, reject) => {
      EntregaAPI.deleteNegocio(negocio_id, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateNegociosQuantidade(entrega_id, params){
    return new Promise((resolve, reject) => {
      EntregaAPI.updateNegocioQuantidade(params, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  addTalhaoToEntrega(entrega_id, params){
    return new Promise((resolve, reject) => {
      EntregaAPI.addTalhao(params, entrega_id).then(response => {
        if(response.status === 201) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  delteTalhaoOfEntrega(entrega_id, talhao_id){
    return new Promise((resolve, reject) => {
      EntregaAPI.deleteTalhao(talhao_id, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response);
      })
    });
  };

  listTalhoesFromEntrega(entrega_id){
    return new Promise((resolve, reject) => {
      EntregaAPI.listTalhoes(entrega_id).then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateTalhoesPercentual(entrega_id, params){
    return new Promise((resolve, reject) => {
      EntregaAPI.updateTalhoesPercentual(params, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateMotorista(entrega_id, motorista){
    return new Promise((resolve, reject) => {
      EntregaAPI.updateMotorista(motorista, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateArmazem(entrega_id, armazem){
    return new Promise((resolve, reject) => {
      EntregaAPI.updateArmazem(armazem, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  addNotaFiscalToNegocio(entrega_id, negocio_id, params){
    return new Promise((resolve, reject) => {
      EntregaAPI.addNotaFiscalToNegocio(params, entrega_id, negocio_id).then(response => {
        if(response.status === 201) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateNotaFiscalItemOfNegocio(entrega_id, id, params){
    return new Promise((resolve, reject) => {
      EntregaAPI.updateNotaFiscalItemOfNegocio(params, id, entrega_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  deleteEntrega(id){
    return new Promise((resolve, reject) => {
      EntregaAPI.deleteEntrega(id).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  getFilterOptions(){
    return new Promise((resolve, reject) => {
      EntregaAPI.getFilterOptions().then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  getDates(id){
    return new Promise((resolve, reject) => {
      EntregaAPI.getEntregaDatas(id).then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  updateDates(id, params){
    return new Promise((resolve, reject) =>{
      EntregaAPI.saveEntregaDatas(id, params).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}
