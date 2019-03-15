import Vue from 'vue';
import SafraCulturaAPI from "../../api/SafraCulturaAPI";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import SafraCulturaListitem from "../../model/safra/SafraCulturaListitem";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import SafraCulturaTalhaoItem from "../../model/safra/SafraCulturaTalhaoItem";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import AreaRepository from "../../repository/resource/AreaRepository";
import CultivarRepository from "../../repository/resource/CultivarRepository";
import MarcaRepository from "../../repository/resource/MarcaRepository";
import CulturaAPI from "../../api/CulturaAPI";
import MarcaAPI from "../../api/MarcaAPI";
import CultivarAPI from "../../api/CultivarAPI";
import SafraCulturaTalhaoAPI from "../../api/SafraCulturaTalhaoAPI";
export default class SafraCulturaService {
  #produtorId;
  #safraCulturaRepository;
  #culturaRepository;
  #imageRepository;
  #safraRepository;
  #safraCulturaTalhaoRepository;
  #talhaoRepository;
  #areaRepository;
  #cultivarRepository;
  #marcaRepository;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.imageRepository = new ImageRepository();
    this.safraRepository = new SafraRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.areaRepository = new AreaRepository();
    this.cultivarRepository = new CultivarRepository();
    this.marcaRepository = new MarcaRepository();
  }

  getSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getSafraCulturaById(id, safra_id).then(response => {
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

  saveSafraCultura(safra_id, safraCultura){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.saveSafraCultura(safraCultura, safra_id).then(response => {
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

  updateSafraCultura(safra_id, safra_cultura_id, safraCultura){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.updateSafraCultura(safraCultura, safra_cultura_id. safra_id).then(response => {
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

  archiveSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.archiveSafraCultura(id, safra_id).then(response => {
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

  restoreSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.restoreSafraCultura(id, safra_id).then(response => {
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

  deleteSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.deleteSafraCultura(id, safra_id).then(response => {
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

  listSafraCulturas(){
    return new Promise(async (resolve, reject) => {
      let safraCulturas = null;

      if(Vue.prototype.serverStatus.isUp) {
        safraCulturas = await SafraCulturaAPI.getSafraCulturas(this.produtorId).then(response => {
          return response.data;
        });
      }else{
        safraCulturas = await this.safraCulturaRepository.getAll();

        for(let safraCultura of safraCulturas){
          let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
          let culturaImage = await this.imageRepository.getById(cultura.image_id);
          let safra = await this.safraRepository.getById(safraCultura.safra_id);

          safraCultura.cultura = {
            id: cultura.id,
            nome: cultura.nome,
            image_file_name: culturaImage.file_name,
            default_unidade_medida_id: cultura.default_unidade_medida_id,
          };
          safraCultura.safra = {
            id: safra.id,
            is_safrinha: safra.is_safrinha,
            ano_inicio: safra.ano_inicio,
            ano_fim: safra.ano_fim,
          };
        }

      }
      safraCulturas = safraCulturas.map(safraCultura => new SafraCulturaListitem(safraCultura));

      resolve(safraCulturas)
    });
  }

  listCulturas(){
    return new Promise((resolve, reject) => {
      CulturaAPI.listCulturasSimpleList(this.produtorId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listMarcas(){
    return new Promise((resolve, reject) => {
      MarcaAPI.listMarcas(null, this.produtorId).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listCultivaresByMarca(culturaId, marcaId){
    return new Promise((resolve, reject) => {
      CultivarAPI.listCultivares('marca_id='+ marcaId, culturaId).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listCultivares(culturaId){
    return new Promise((resolve, reject) => {
      CultivarAPI.listCultivares(null, culturaId).then( response => {
        if(response.status === 200){
          resolve(response.data);
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
        safraCulturaTalhoes = await SafraCulturaAPI.getFullSafraCulturaTalhoes(safra_cultura_id).then(response => {
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

  /*Safra Cultura Talhao*/
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

  deleteSafraCulturaTalhao(safra_cultura_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaTalhaoAPI.deleteSafraCulturaTalhao(id, safra_cultura_id).then(response => {
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

  getDiario(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getDiario(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getDiarioClassificacao(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getDiarioClassificacao(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getAreas(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getAreas(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getTalhoes(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getTalhoes(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getMarcas(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getMarcas(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getCultivares(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getCultivares(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getCaminhoes(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getCaminhoes(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getArmazens(safra_id, id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.getArmazens(id, safra_id).then(response => {
        if(response.status ===  200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

}
