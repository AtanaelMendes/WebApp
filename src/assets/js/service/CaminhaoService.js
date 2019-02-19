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
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/caminhao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  listFreeCaminhoes() {
    return new Promise(async (resolve, reject) => {
      let caminhoes = null;

      if(navigator.onLine) {
        caminhoes = await  CaminhaoAPI.getFreeCaminhoes(this.produtorId).then(response => {
          return response.data;
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
}
