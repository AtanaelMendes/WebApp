import Vue from 'vue'
import SafraCulturaAPI from "../../api/SafraCulturaAPI";
import SafraCulturaRepository from "../../repository/reource/SafraCulturaRepository";
import SafraCulturaListitem from "../../model/safra/SafraCulturaListitem";
import CulturaRepository from "../../repository/reource/CulturaRepository";
import ImageRepository from "../../repository/reource/ImageRepository";
import SafraRepository from "../../repository/reource/SafraRepository";
import SafraCulturaTalhaoRepository from "../../repository/reource/SafraCulturaTalhaoRepository";
import SafraCulturaTalhaoItem from "../../model/safra/SafraCulturaTalhaoItem";
import TalhaoRepository from "../../repository/reource/TalhaoRepository";
import AreaRepository from "../../repository/reource/AreaRepository";
import CultivarRepository from "../../repository/reource/CultivarRepository";
import MarcaRepository from "../../repository/reource/MarcaRepository";
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

  constructor() {
    this.produtorId = 1; //TODO Buscar o id aqui
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
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  saveSafraCultura(safra_id, safraCultura){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('safra/' + safra_id + '/safra_cultura', safraCultura).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  updateSafraCultura(safra_id, safra_cultura_id, safraCultura){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('safra/' + safra_id + '/safra_cultura/' + safra_cultura_id, safraCultura).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  archiveSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/safra/' + safra_id + '/safra_cultura/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  restoreSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/safra/' + safra_id + '/safra_cultura/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  deleteSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/safra/' + safra_id + '/safra_cultura/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  listSafraCulturas(){
    return new Promise(async (resolve, reject) => {
      let safraCulturas = null;

      if(navigator.onLine) {
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
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/cultura/simple_list').then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  }

  listMarcas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/marca').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  }

  listCultivaresByMarca(culturaId, marcaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/'+culturaId+'/cultivar?marca_id='+ marcaId).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  }

  listCultivares(culturaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/'+culturaId+'/cultivar').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  }

  listFullSafraCulturaTalhao(safra_cultura_id){
    return new Promise(async (resolve, reject) => {
      let safraCulturaTalhoes = null;

      if(navigator.onLine) {
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

  updateSafraCulturaTalhao(safra_cultura_id, id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  deleteSafraCulturaTalhao(safra_cultura_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  saveCultivarToSafraCulturaTalhao(safra_cultura_id, safra_cultura_talhao_id, cultivar_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/' + safra_cultura_talhao_id + '/add_cultivar/' + cultivar_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getDiario(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/diario').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getDiarioClassificacao(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/diario-classificacao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getAreas(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/areas').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getTalhoes(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/talhoes').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getMarcas(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/marcas').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getCultivares(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/cultivares').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getCaminhoes(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/caminhoes').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

  getArmazens(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/armazens').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }

}
