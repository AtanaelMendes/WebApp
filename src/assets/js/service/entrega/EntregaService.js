import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import EntregasQueue from "../../queue/EntregasQueue";
import EntregaCarregandoListItem from "../../model/entrega/EntregaCarregandoListItem";
import CaminhaoRepository from "../../repository/CaminhaoRepository";
import SafraCulturaTalhaoRepository from "../../repository/SafraCulturaTalhaoRepository";
import ImageRepository from "../../repository/ImageRepository";
import AreaRepository from "../../repository/AreaRepository";
import SafraRepository from "../../repository/SafraRepository";
import CulturaRepository from "../../repository/CulturaRepository";
import TalhaoRepository from "../../repository/TalhaoRepository";
import SafraCulturaRepository from "../../repository/SafraCulturaRepository";

export default class EntregaService{
  #entregasQueue;
  #produtorId;
  #caminhaoRepository;
  #safraCulturaTalhaoRepository;
  #imageRepository;
  #areaRepository;
  #safraRepository;
  #safraCulturaRepository;
  #culturaRepository;
  #talhaoRepository;

  constructor() {
    this.entregasQueue = new EntregasQueue();
    this.produtorId = localStorage.getItem('account.produtor_id');
    this.caminhaoRepository = new CaminhaoRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.imageRepository = new ImageRepository();
    this.areaRepository = new AreaRepository();
    this.safraRepository = new SafraRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.talhaoRepository = new TalhaoRepository();
  }

  listEntregasCarregando(filter = null){
    console.log('listEntregasCarregando')
    return new Promise(async (resolve, reject) => {

      let entregas = await Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega?status=carregando' + (filter ? ("&" + filter) : "")).then(response => {
        console.log('success');
        return response.data;
      }).catch(error => {
        console.log('error');
        return null;
      });

      entregas = entregas.map(entrega => {
        return new EntregaCarregandoListItem(entrega)
      });

      let url = Vue.prototype.$axios.defaults.baseURL + 'produtor/' + this.produtorId + '/entrega';
      let queueItens = await new EntregasQueue().getByUrlAndMethod(url, 'post').toArray();

      let queueEntregas = await Promise.all(queueItens.map(async queueItem => {
        let caminhao = await this.caminhaoRepository.getById(queueItem.request.body.caminhao_id);
        let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
        let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(queueItem.request.body.safra_cultura_talhao_id);
        let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
        let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
        let safra = await this.safraRepository.getById(safraCultura.safra_id);
        let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
        let area = await this.areaRepository.getById(talhao.area_id);

        let entregaItem = new EntregaCarregandoListItem();
        entregaItem.id = -1;
        entregaItem.isInQueueState = true;
        entregaItem.caminhao.nome = caminhao.nome;
        entregaItem.caminhao.placa = caminhao.placa;
        entregaItem.caminhao.image_file_name = caminhaoImage.file_name;
        entregaItem.inicio_carregamento = queueItem.date;
        entregaItem.safra_culturas_talhoes.push({
          area: area.nome,
          safra: cultura.nome + " " + safra.ano_inicio + "/" + safra.ano_fim,
          talhao: talhao.nome,
        });

        return entregaItem;

      }));
      resolve(entregas.concat(queueEntregas));

    });
  };

  listEntregasNoArmazem(filter = null){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega?status=no_armazem' + (filter ? ("&" + filter) : "")).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  listCargasEntregues(filter = null){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega?status=entregue' + (filter ? ("&" + filter) : "")).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  getEntregaById(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega/'+ id).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  saveEntrega(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ this.produtorId + '/entrega', params).then(response => {
        if(response.status === 201) {
          resolve(response)
        }
      }).catch(error => {
        if(!navigator.onLine){
          this.entregasQueue.add(error.config);
          resolve();
        }else{
          reject(error.response)
        }
      })
    });
  };

  sendEntregaToArmazen(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/enviar_entrega', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  addNegocioToEntrega(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('entrega/'+ entrega_id + '/negocio', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  delteNegocioOfEntrega(entrega_id, negocio_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('entrega/'+ entrega_id + '/negocio/' + negocio_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateNegociosQuantidade(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('entrega/'+ entrega_id + '/negocio', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  addTalhaoToEntrega(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/talhao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  delteTalhaoOfEntrega(entrega_id, talhao_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/talhao/' + talhao_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  listTalhoesFromEntrega(entrega_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega/' + entrega_id + '/talhoes').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateTalhoesPercentual(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/talhoes', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateMotorista(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/motorista', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateArmazem(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/armazem', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  addNotaFiscalToNegocio(entrega_id, negocio_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('entrega/'+ entrega_id + '/negocio/' + negocio_id + '/nota_fiscal', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updateNotaFiscalItemOfNegocio(entrega_id, id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ entrega_id + '/nota_fiscal_item/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  /*updateEntrega(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  archiveEntrega(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  restoreEntrega(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/' + id +'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };*/

  deleteEntrega(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ this.produtorId + '/entrega/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  /*saveTalhaoPercentage(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ this.produtorId + '/entrega/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };*/

  getFilterOptions(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega/filter_option').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

}
