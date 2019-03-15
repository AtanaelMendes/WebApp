import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import CaminhaoAPI from "../api/CaminhaoAPI";
import CaminhaoRepository from "../repository/resource/CaminhaoRepository";
import CaminhaoListItem from "../model/CaminhaoListItem";
import ImageRepository from "../repository/resource/ImageRepository";

export default class CaminhaoService {
  #produtorId;
  #caminahoRepository;
  #imageRepository;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.caminahoRepository = new CaminhaoRepository();
    this.imageRepository = new ImageRepository();
  }

  listCaminhoes() {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.listCaminhoes(this.produtorId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listFreeCaminhoes() {
    return new Promise(async (resolve, reject) => {
      let caminhoes = null;

      if(Vue.prototype.serverStatus.isUp) {
        caminhoes = await  CaminhaoAPI.getFreeCaminhoes(this.produtorId).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        });
      }else{
        caminhoes = await this.caminahoRepository.getAllFree();

        for(let caminhao of caminhoes){
          let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
          caminhao.image_file_name = caminhaoImage.file_name;
        }
      }

      caminhoes = caminhoes.map(caminhao => new CaminhaoListItem(caminhao))

      resolve(caminhoes)
    });
  }

  getCaminhaoById(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/'+ produtor_id +'/caminhao/'+ id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  addCaminhao(params) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/produtor/'+ produtor_id +'/caminhao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateCaminhao(id, params) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/'+ produtor_id +'/caminhao/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveCaminhao(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/'+ produtor_id +'/caminhao/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreCaminhao(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/'+ produtor_id +'/caminhao/'+id+'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteCaminhao(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/produtor/'+ produtor_id +'/caminhao/'+ id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };
}
