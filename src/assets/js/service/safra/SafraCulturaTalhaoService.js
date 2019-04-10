import Vue from 'vue';
import SafraCulturaTalhaoAPI from "../../api/SafraCulturaTalhaoAPI";
import SafraCulturaTalhaoItem from "../../model/safra/SafraCulturaTalhaoItem";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import AreaRepository from "../../repository/resource/AreaRepository";
import CultivarRepository from "../../repository/resource/CultivarRepository";
import MarcaRepository from "../../repository/resource/MarcaRepository";
import ImageRepository from "../../repository/resource/ImageRepository";

export default class SafraCulturaTalhaoService {
  #safraCulturaTalhaoRepository;
  #talhaoRepository;
  #areaRepository;
  #cultivarRepository;
  #marcaRepository;
  #imageRepository;

  constructor(){
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.areaRepository = new AreaRepository();
    this.cultivarRepository = new CultivarRepository();
    this.marcaRepository = new MarcaRepository();
    this.imageRepository = new ImageRepository();
  }

  listSafraCulturaTalhoesStatus(safraCulturaId){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.listSafraCulturaTalhoesStatus(safraCulturaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  updateSafraCulturaTalhoesStatus(safraCulturaId, talhoes){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.updateSafraCulturaTalhoesStatus(talhoes, safraCulturaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listFullSafraCulturaTalhao(safra_cultura_id){
    return new Promise(async (resolve, reject) => {
      let safraCulturaTalhoes = null;

      if(Vue.prototype.serverStatus.isUp) {
        safraCulturaTalhoes = await SafraCulturaTalhaoAPI.getFullSafraCulturaTalhoes(safra_cultura_id).then(response => {
          return response.data;
        })
      }else{
        safraCulturaTalhoes = await this.safraCulturaTalhaoRepository.getBySafraCultura(safra_cultura_id);

        for(let safraCulturaTalhao of safraCulturaTalhoes){
          let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
          let talhaoImage = await this.imageRepository.getById(talhao.image_id);
          let area = await this.areaRepository.getById(talhao.area_id);
          let areaImage = await this.imageRepository.getById(area.image_id);
          if(safraCulturaTalhao.cultivar !== null && safraCulturaTalhao.cultivar !== undefined){
            let cultivar = await this.cultivarRepository.getById(safraCulturaTalhao.cultivar.id);
            let marca = await this.marcaRepository.getById(cultivar.marca_id);
            let marcaImage = await this.imageRepository.getById(marca.image_id);

            safraCulturaTalhao.cultivar = {
              id: null,
              nome: null,
              marca: {
                id: marca.id,
                nome: marca.nome,
                image_file_name: marcaImage.file_name,
              },
            };
          }

          safraCulturaTalhao.talhao = {
            id: talhao.id,
            nome: talhao.nome,
            image_file_name: talhaoImage.file_name,
            area: {
              id: area.id,
              nome: area.nome,
              image_file_name: areaImage.file_name,
            },
          };
        }
      }

      safraCulturaTalhoes = safraCulturaTalhoes.map(safraCulturaTalhao => new SafraCulturaTalhaoItem(safraCulturaTalhao));

      resolve(safraCulturaTalhoes);
    });
  }

  updateSafraCulturaTalhao(safra_cultura_id, id, params){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.updateSafraCulturaTalhao(params, id, safra_cultura_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  unattachSafraCulturaTalhao(safra_cultura_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.unattachSafraCulturaTalhao(id, safra_cultura_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  unattachSafraCulturaTalhoesByArea(safra_cultura_id, area_id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.unattachSafraCulturaTalhoesByArea(safra_cultura_id, area_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  saveCultivarToSafraCulturaTalhao(safra_cultura_id, safra_cultura_talhao_id, cultivar_id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.addCultivar(cultivar_id, safra_cultura_talhao_id, safra_cultura_id).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  unattachCultivar(cultivarId, safra_cultura_talhao_id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.unattachCultivar(cultivarId, safra_cultura_talhao_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listSafraCulturaTalhoesCultivares(safra_cultura_id, safra_cultura_talhao_id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.listCultivares(safra_cultura_id, safra_cultura_talhao_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  updateSafraCulturaTalhoesCultivaresTamanho(cultivares, safra_cultura_id, safra_cultura_talhao_id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.updateCultivares(cultivares, safra_cultura_id, safra_cultura_talhao_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }
}
