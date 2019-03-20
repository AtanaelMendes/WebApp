import Vue from 'vue'
import CaminhaoAPI from "../api/CaminhaoAPI";
import CaminhaoRepository from "../repository/resource/CaminhaoRepository";
import CaminhaoListItem from "../model/CaminhaoListItem";
import ImageRepository from "../repository/resource/ImageRepository";

export default class CaminhaoService {
  #caminahoRepository;
  #imageRepository;

  constructor() {
    this.caminahoRepository = new CaminhaoRepository();
    this.imageRepository = new ImageRepository();
  }

  listCaminhoes() {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.listCaminhoes().then(response => {
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
        caminhoes = await  CaminhaoAPI.getFreeCaminhoes().then(response => {
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

      caminhoes = caminhoes.map(caminhao => new CaminhaoListItem(caminhao));

      resolve(caminhoes)
    });
  }

  getCaminhaoById(id) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.getCaminhaoById(id).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  addCaminhao(caminhao) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.saveCaminhao(caminhao).then(response => {
        if(response.status === 201){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateCaminhao(id, caminhao) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.updateCaminao(caminhao, id).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveCaminhao(id) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.archiveCaminhao(id).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreCaminhao(id) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.restoreCaminhao(id).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteCaminhao(id) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.deleteCaminhao(id).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
}
