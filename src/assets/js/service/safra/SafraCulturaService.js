import Vue from 'vue';
import SafraCulturaAPI from "../../api/SafraCulturaAPI";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import SafraCulturaListitem from "../../model/safra/SafraCulturaListitem";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import SafraRepository from "../../repository/resource/SafraRepository";

export default class SafraCulturaService {
  #safraCulturaRepository;
  #culturaRepository;
  #imageRepository;
  #safraRepository;

  constructor() {
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.imageRepository = new ImageRepository();
    this.safraRepository = new SafraRepository();
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
      SafraCulturaAPI.updateSafraCultura(safraCultura, safra_cultura_id, safra_id).then(response => {
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
        safraCulturas = await SafraCulturaAPI.getSafraCulturas().then(response => {
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

  addTalhoes(safra_id, id, talhoes){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.addTalhoes(id, safra_id, talhoes).then(response => {
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

  listFreeTalhoes(safra_id, safra_cultura_id, area_id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.listFreeTalhoes(safra_cultura_id, safra_id, area_id).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listFreeAreas(safra_id, safra_cultura_id){
    return new Promise((resolve, reject) => {
      SafraCulturaAPI.listFreeAreas(safra_cultura_id, safra_id).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

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
