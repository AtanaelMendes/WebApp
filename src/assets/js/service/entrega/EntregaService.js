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
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import EntregaTalhaoRepository from "../../repository/resource/EntregaTalhaoRepository";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import AreaRepository from "../../repository/resource/AreaRepository";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import LocalizacaoRepository from "../../repository/resource/LocalizacaoRepository";
import Localizacao from "../../dbModel/Localizacao";
import EntregaPesagemRepository from "../../repository/resource/EntregaPesagemRepository";
import UnidadeRepository from "../../repository/resource/UnidadeRepository";
import UnidadeConversaoUtil from "../../UnidadeConversaoUtil";

export default class EntregaService{
  #entregasQueue;
  #produtorId;
  #entregaViewRepository;
  #entregaRepository;
  #caminhaoRepository;
  #imageRepository;
  #entregaTalhaoRepository;
  #safraCulturaTalhaoRepository;
  #safraCulturaRepository;
  #culturaRepository;
  #safraRepository;
  #talhaoRepository;
  #areaRepository;
  #motoristaRepository;
  #armazemRepository;
  #localizacaoRepository;
  #entregaPesagemRepository;
  #unidadeRepository;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.entregasQueue = new EntregasQueue();
    this.entregaViewRepository = new EntregaViewRepository();
    this.entregaRepository = new EntregaRepository();
    this.caminhaoRepository = new CaminhaoRepository();
    this.imageRepository = new ImageRepository();
    this.entregaTalhaoRepository = new EntregaTalhaoRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.safraRepository = new SafraRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.areaRepository = new AreaRepository();
    this.motoristaRepository = new MotoristaRepository();
    this.armazemRepository = new ArmazemRepository();
    this.localizacaoRepository = new LocalizacaoRepository();
    this.entregaPesagemRepository = new EntregaPesagemRepository();
    this.unidadeRepository = new UnidadeRepository();
  }

  listEntregasCarregando(filter = null){
    return new Promise(async (resolve, reject) => {
      let entregas = null;
      let entregasCarregandoListItemBuilder = new EntregaCarregandoListItemBuilder();

      if(navigator.onLine){
        entregas = await EntregaAPI.listEntregasByStatus('carregando', filter, this.produtorId).then(response => {
          if(response.status === 200){
            return resolve(response.data);
          }else{
            return reject(response);
          }
        })
      }else{
        entregas = await this.entregaRepository.getByStatus(Entrega.CARREANDO);

        entregas = await Promise.all(entregas.map(async entrega => {
          let caminhao = await this.caminhaoRepository.getById(entrega.caminhao_id);
          let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
          let entregasTalhoes = await this.entregaTalhaoRepository.getByEntregaId(entrega.id);

          let safraCulturasTalhoes = await Promise.all(entregasTalhoes.map(async entregaTalhao => {
            let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaTalhao.safra_cultura_talhao_id);
            let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
            let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
            let safra = await this.safraRepository.getById(safraCultura.safra_id);
            let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
            let area = await this.areaRepository.getById(talhao.area_id);

            return {
              id: entregaTalhao.id,
              percentual: entregaTalhao.percentual,
              safra: cultura.nome + ' ' + safra.ano_inicio + '/' + safra.ano_fim,
              area: area.nome,
              talhao: talhao.nome,
            }
          }));

          return {
            id: entrega.id,
            inicio_carregamento: entrega.inicio_carregamento,
            caminhao: {
              id: caminhao.id,
              nome: caminhao.nome,
              placa: caminhao.placa,
              image_file_name: caminhaoImage.file_name,
            },
            safra_culturas_talhoes: safraCulturasTalhoes,
          }
        }));
      }

      entregas = entregas.map(entrega => {
        return new EntregaCarregandoListItem(entrega)
      });

      let queueItens = await this.entregasQueue.listByType(EntregasQueue.NOVA_ENTREGA);

      for(let i = 0; i < queueItens.length; i++){
        let url = Vue.prototype.$axios.defaults.baseURL + 'produtor/' + this.produtorId + '/entrega';
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

      if(navigator.onLine){
        entregas = await EntregaAPI.listEntregasByStatus('no_armazem', filter, this.produtorId).then(response => {
          if(response.status === 200){
            return resolve(response.data);
          }else{
            return reject(response);
          }
        })
      }else{
        entregas = await this.entregaRepository.getByStatus(Entrega.NO_ARMAZEM);

        entregas = await Promise.all(entregas.map(async entrega => {
          let caminhao = await this.caminhaoRepository.getById(entrega.caminhao_id);
          let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
          let motorista = await this.motoristaRepository.getById(entrega.motorista_id);
          let motoristaImage = await this.imageRepository.getById(motorista.image_id);
          let armazem = await this.armazemRepository.getById(entrega.armazem_id);
          let localizacao = new Localizacao(await this.localizacaoRepository.getById());

          return {
            id: entrega.id,
            envio_armazem: entrega.envio_armazem,
            caminhao: {
              nome: caminhao.nome,
              placa: caminhao.placa,
              image_file_name: caminhaoImage.file_name,
            },
            motorista: {
              nome: motorista.nome,
              image_file_name: motoristaImage.file_name,
            },
            armazem: {
              nome: armazem.nome,
              localizacao: localizacao.getFullAddress(),
            }
          }
        }));
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

      if(navigator.onLine){
        entregas = await EntregaAPI.listEntregasByStatus('entregue', filter, this.produtorId).then(response => {
          if(response.status === 200){
            return resolve(response.data);
          }else{
            return reject(response);
          }
        })
      }else{
        entregas = await this.entregaRepository.getByStatus(Entrega.ENTREGUE);


        entregas = await Promise.all(entregas.map(async entrega => {
          let unidadeConversaoUtil = new UnidadeConversaoUtil();
          let caminhao = await this.caminhaoRepository.getById(entrega.caminhao_id);
          let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
          let motorista = await this.motoristaRepository.getById(entrega.motorista_id);
          let armazem = await this.armazemRepository.getById(entrega.armazem_id);
          let entregasPesagens = await this.entregaPesagemRepository.getAllSortedByEmissaoDesc(entrega.id);
          let entregaTalhao = await this.entregaTalhaoRepository.first();
          let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaTalhao.safra_cultura_talhao_id);
          let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
          let safra = await this.safraRepository.getById(safraCultura.safra_id);
          let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);

          let unidadeParaConversao = await this.unidadeRepository.getById(entregasPesagens[0].unidade_medida_id);
          let total_peso_liquido = 0;
          let total_peso_bruto_produto = 0;
          let total_peso_desconto = 0;

          for(let entregaPesagem of entregasPesagens){
            let entregaPesagemUnidadeMedida = await this.unidadeRepository.getById(entregaPesagem.unidade_medida_id);

            total_peso_liquido += await unidadeConversaoUtil.convert(entregaPesagemUnidadeMedida.id, unidadeParaConversao.id, parseFloat(entregaPesagem.peso_liquido));
            total_peso_bruto_produto += await unidadeConversaoUtil.convert(entregaPesagemUnidadeMedida.id, unidadeParaConversao.id, parseFloat(entregaPesagem.peso_bruto_produto));
            total_peso_desconto += await unidadeConversaoUtil.convert(entregaPesagemUnidadeMedida.id, unidadeParaConversao.id, parseFloat(entregaPesagem.peso_desconto));
          }

          let peso =  total_peso_liquido.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 });

          if(total_peso_desconto > 0){
            peso += " ("
              + total_peso_bruto_produto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 })
              + " - " + total_peso_desconto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 }) + ")";
          }
          peso += " " + unidadeParaConversao.sigla;

          return {
            id: entrega.id,
            caminhao: {
              placa: caminhao.placa,
              image_file_name: caminhaoImage.file_name
            },
            motorista: motorista.nome,
            armazem: armazem.nome,
            entregue: entregasPesagens[0].emissao,
            safra: cultura.nome + " " + safra.ano_inicio + "/" + safra.ano_fim,
            peso: peso,
          }
        }));
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
        if(navigator.onLine){
          EntregaAPI.getEntrega(id, this.produtorId).then(response => {
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
      EntregaAPI.saveEntrega(entrega, this.produtorId).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject();
        }
      }).catch(error => {
        if(!navigator.onLine){
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
      EntregaAPI.sendToArmazem(params, entrega_id, this.produtorId).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }).catch(error => {
        if(!navigator.onLine){
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
      EntregaAPI.addTalhao(params, entrega_id, this.produtorId).then(response => {
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
      EntregaAPI.deleteTalhao(talhao_id, entrega_id, this.produtorId).then(response => {
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
      EntregaAPI.listTalhoes(entrega_id, this.produtorId).then( response => {
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
      EntregaAPI.updateTalhoesPercentual(params, entrega_id, this.produtorId).then(response => {
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
      EntregaAPI.updateMotorista(motorista, entrega_id, this.produtorId).then(response => {
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
      EntregaAPI.updateArmazem(armazem, entrega_id, this.produtorId).then(response => {
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
      EntregaAPI.updateNotaFiscalItemOfNegocio(params, id, entrega_id, this.produtorId).then(response => {
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
      EntregaAPI.deleteEntrega(id, this.produtorId).then(response => {
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

}
