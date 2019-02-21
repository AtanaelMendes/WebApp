import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import EntregasQueue from "../../queue/EntregasQueue";
import EntregaCarregandoListItem from "../../model/entrega/EntregaCarregandoListItem";
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import AreaRepository from "../../repository/resource/AreaRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import EntregaCarregandoListRepository from "../../repository/list/EntregaCarregandoListRepository";
import EntregaNoArmazemListRepository from "../../repository/list/EntregaNoArmazemListRepository";
import EntregaEntregueListRepository from "../../repository/list/EntregaEntregueListRepository";
import EntregaAPI from "../../api/EntregaAPI";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import UnidadeRepository from "../../repository/resource/UnidadeRepository";
import EntregaNoArmazemListItem from "../../model/entrega/EntregaNoArmazemListItem";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";
import LocalizacaoRepository from "../../repository/resource/LocalizacaoRepository";
import CfopRepository from "../../repository/resource/CfopRepository";
import NotaFiscalSerieRepository from "../../repository/resource/NotaFiscalSerieRepository";
import NegocioCulturaRepository from "../../repository/resource/NegocioCulturaRepository";
import NegocioRepository from "../../repository/resource/NegocioRepository";
import PessoaRepository from "../../repository/resource/PessoaRepository";
import TipoNegocioRepository from "../../repository/resource/TipoNegocioRepository";
import NegocioCulturaArmazemRepository from "../../repository/resource/NegocioCulturaArmazemRepository";
import EntregaEntregueListItem from "../../model/entrega/EntregaEntregueListItem";

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
  #entregaCarreandoListRepository;
  #entregaNoArmazemListRepository;
  #entregaEntregueListRepository;
  #entreaViewRepository;
  #unidadeRepository;
  #armazemRepository;
  #motoristaRepository;
  #localizacaoRepository;
  #cfopRepository;
  #notaFiscalSerieRepository;
  #negocioCulturaRepository;
  #negocioRepository;
  #tipoNegocioRepository;
  #pessoaRepository;
  #negocioCulturaArmazemRepository;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.entregasQueue = new EntregasQueue();
    this.caminhaoRepository = new CaminhaoRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.imageRepository = new ImageRepository();
    this.areaRepository = new AreaRepository();
    this.safraRepository = new SafraRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.entregaCarreandoListRepository = new EntregaCarregandoListRepository();
    this.entregaNoArmazemListRepository = new EntregaNoArmazemListRepository();
    this.entregaEntregueListRepository = new EntregaEntregueListRepository();
    this.entreaViewRepository = new EntregaViewRepository();
    this.unidadeRepository = new UnidadeRepository();
    this.armazemRepository = new ArmazemRepository();
    this.motoristaRepository = new MotoristaRepository();
    this.localizacaoRepository = new LocalizacaoRepository();
    this.cfopRepository = new CfopRepository();
    this.notaFiscalSerieRepository = new NotaFiscalSerieRepository();
    this.negocioCulturaRepository = new NegocioCulturaRepository();
    this.negocioRepository = new NegocioRepository();
    this.tipoNegocioRepository = new TipoNegocioRepository();
    this.pessoaRepository = new PessoaRepository();
    this.negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
  }

  listEntregasCarregando(filter = null){
    return new Promise(async (resolve, reject) => {
      let entregas = null;

      if(navigator.onLine){
        entregas = await Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega?status=carregando' + (filter ? ("&" + filter) : "")).then(response => {
          return response.data;
        })
      }else{
        entregas = await this.entregaCarreandoListRepository.getAll();
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
        let caminhao = await this.caminhaoRepository.getById(queueItem.request.body.caminhao_id);
        let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
        let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(queueItem.request.body.safra_cultura_talhao_id);
        let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
        let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
        let safra = await this.safraRepository.getById(safraCultura.safra_id);
        let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
        let area = await this.areaRepository.getById(talhao.area_id);

        let entregaItem = new EntregaCarregandoListItem();
        entregaItem.id = queueItem.id;
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
    return new Promise(async (resolve, reject) => {
      let entregas = null;

      if(navigator.onLine){
        entregas = await Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega?status=no_armazem' + (filter ? ("&" + filter) : "")).then(response => {
          return response.data;
        })
      }else{
        entregas = await this.entregaNoArmazemListRepository.getAll();
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
        let url = queueItem.request.url;
        let entregaId = parseInt(url.match("(queue::([0-9]*))")[2]);
        let entregaQueue = await this.entregasQueue.getById(entregaId);
        let caminhaoId = entregaQueue.request.body.caminhao_id;
        let caminhao = await this.caminhaoRepository.getById(caminhaoId);
        let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
        let armazem = await this.armazemRepository.getById(queueItem.request.body.armazem_id);
        let motorista = await this.motoristaRepository.getById(queueItem.request.body.motorista_id);
        let motoristaImage = await this.imageRepository.getById(motorista.image_id);

        let localizacao = await this.localizacaoRepository.getById(armazem.localizacao_id);
        let endereco = localizacao.endereco + ', ' + localizacao.numero + '  ' + localizacao.bairro + ' - ' + localizacao.cidade.nome + '/' + localizacao.cidade.estado.nome;

        let entregaItem = new EntregaNoArmazemListItem();
        entregaItem.id = queueItem.id;
        entregaItem.isInQueueState = true;
        entregaItem.caminhao.nome = caminhao.nome;
        entregaItem.caminhao.placa = caminhao.placa;
        entregaItem.caminhao.image_file_name = caminhaoImage.file_name;
        entregaItem.armazem.nome = armazem.nome;
        entregaItem.armazem.localizacao = endereco;
        entregaItem.motorista.nome = motorista.nome;
        entregaItem.motorista.image_file_name = motoristaImage.file_name;
        entregaItem.envio_armazem = queueItem.date;

        return entregaItem;

      }));

      resolve(entregas.concat(queueEntregas));
    });

  };

  listCargasEntregues(filter = null){
    return new Promise(async (resolve, reject) => {
      let entregas = null;

      if(navigator.onLine){
        entregas = await Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega?status=entregue' + (filter ? ("&" + filter) : "")).then(response => {
          return response.data;
        })
      }else{
        entregas = await this.entregaEntregueListRepository.getAll();
      }

      entregas = entregas.map(entrega => {
        return new EntregaEntregueListItem(entrega);
      });

      let queueItens = await this.entregasQueue.listByType(EntregasQueue.INFORMAR_PESAGEM);

      let queueEntregas = await Promise.all(queueItens.map(async queueItem => {
        let url = queueItem.request.url;
        let entregaNoArmazemId = parseInt(url.match("(queue::([0-9]*))")[2]);
        let entregaNoArmazemQueue = await this.entregasQueue.getById(entregaNoArmazemId);
        let entregaCarregandoId = parseInt(entregaNoArmazemQueue.request.url.match("(queue::([0-9]*))")[2]);
        let entregaCarregandoQueue = await this.entregasQueue.getById(entregaCarregandoId);
        let caminhaoId = entregaCarregandoQueue.request.body.caminhao_id;
        let caminhao = await this.caminhaoRepository.getById(caminhaoId);
        let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
        let armazem = await this.armazemRepository.getById(entregaNoArmazemQueue.request.body.armazem_id);
        let motorista = await this.motoristaRepository.getById(entregaNoArmazemQueue.request.body.motorista_id);

        let entregaItem = new EntregaEntregueListItem();
        entregaItem.id = queueItem.id;
        entregaItem.isInQueueState = true;
        entregaItem.caminhao.image_file_name = caminhaoImage.file_name;
        entregaItem.caminhao.placa = caminhao.placa;
        entregaItem.armazem = armazem.nome;
        entregaItem.motorista = motorista.nome;
        entregaItem.entregue = queueItem.date;
        entregaItem.peso = -1;
        entregaItem.safra = 'Colcar safra aqui';

        return entregaItem;

      }));

      resolve(queueEntregas.concat(entregas));
    });
  };

  getEntregaById(id){
    return new Promise(async(resolve, reject) => {
      if(typeof id === 'string' && id.match("(queue::([0-9]*))")){
        let queueId = parseInt(id.match("(queue::([0-9]*))")[2]);

        let entregaQueue = await this.entregasQueue.getById(queueId);
        let entregaCarregandoQueue = null;
        let status = null;
        let caminhao = null;
        let safraCulturaTalhao = null;
        let motorista = null;
        let motoristaImage = null;
        let armazem = null;
        let cfop = null;
        let notaFiscalSerie = null;
        let negocioCultura = null;
        let negocioCulturaUnidadeMedida = null;
        let negocio = null;
        let tipoNegocio = null;
        let pessoaNegocio = null;
        let negocioCulturaSafraCultura = null;
        let negocioCulturaSafraCulturaCultura = null;
        let negocioCulturaArmazens = null;

        switch (entregaQueue.type) {
          case EntregasQueue.NOVA_ENTREGA:
            status = 'Carregando';
            caminhao = await this.caminhaoRepository.getById(entregaQueue.request.body.caminhao_id);
            safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaQueue.request.body.safra_cultura_talhao_id);
            break;
          case EntregasQueue.ENVIAR_PARA_ARMAZEM:
            status = 'No Armazem';
            let entregaCarregandoQueueId = parseInt(entregaQueue.request.url.match("(queue::([0-9]*))")[2]);
            entregaCarregandoQueue = await this.entregasQueue.getById(entregaCarregandoQueueId);
            caminhao = await this.caminhaoRepository.getById(entregaCarregandoQueue.request.body.caminhao_id);
            safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaCarregandoQueue.request.body.safra_cultura_talhao_id);
            motorista = await this.motoristaRepository.getById(entregaQueue.request.body.motorista_id);
            motoristaImage = await this.imageRepository.getById(motorista.image_id);
            armazem = await this.armazemRepository.getById(entregaQueue.request.body.armazem_id);
            cfop = await this.cfopRepository.getById(entregaQueue.request.body.nota_fiscal.cfop_id);
            notaFiscalSerie = await this.notaFiscalSerieRepository.getById(entregaQueue.request.body.nota_fiscal.nota_fiscal_serie_id);
            negocioCultura = await this.negocioCulturaRepository.getById(entregaQueue.request.body.negocio_cultura_id);
            negocioCulturaUnidadeMedida = await this.unidadeRepository.getById(negocioCultura.unidade_medida_id);
            negocio = await this.negocioRepository.getById(negocioCultura.negocio_id);
            tipoNegocio = await this.tipoNegocioRepository.getById(negocio.tipo_negocio_id);
            pessoaNegocio = await this.pessoaRepository.getById(negocio.pessoa_id);
            negocioCulturaSafraCultura = await this.safraCulturaRepository.getById(negocioCultura.safra_cultura_id);
            negocioCulturaSafraCulturaCultura = await this.culturaRepository.getById(negocioCulturaSafraCultura.cultura_id);
            negocioCulturaArmazens = await this.negocioCulturaArmazemRepository.getAllByNegocioCultura(negocioCultura.id);
            break;
        }

        let caminhaoImagem = await this.imageRepository.getById(caminhao.image_id);
        let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
        let talhaoImagem = await this.imageRepository.getById(talhao.image_id);
        let area = await this.areaRepository.getById(talhao.area_id);
        let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
        let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
        let culturaImagem = await this.imageRepository.getById(cultura.image_id);
        let safra = await this.safraRepository.getById(safraCultura.safra_id);
        let unidade = await this.unidadeRepository.getById(caminhao.unidade_medida_id);
        let safraCulturaUnidade = await this.unidadeRepository.getById(safraCultura.view_unidade_medida_id);

        let talhoes = [
          {
            id: -1,
            percentual: -1,
            quantidade: -1,
            talhao: {
              nome: talhao.nome,
              area: area.nome,
              image_file_name: talhaoImagem.file_name,
            },
            safra_cultura_talhao: {
              id: safraCulturaTalhao.id
            }
          }
        ];

        let entrega = {
          id: entregaQueue.id,
          inicio_carregamento: entregaQueue.date,
          status: status,
          caminhao: {
            id: caminhao.id,
            nome: caminhao.nome,
            placa: caminhao.placa,
            estimativa_carga: caminhao.pbt - caminhao.tara,
            unidade_medida_sigla: unidade.sigla,
            image_file_name: caminhaoImagem.file_name,
          },
          safra_cultura: {
            id: safraCultura.id,
            view_unidade_medida: {
              id: safraCulturaUnidade.id,
              sigla: safraCulturaUnidade.sigla,
            },
            cultura: {
              nome: cultura.nome,
              image_file_name: culturaImagem.file_name,
            },
            safra: {
              ano_inicio: safra.ano_inicio,
              ano_fim: safra.ano_fim,
            },
            talhoes: talhoes,
          },
        };

        if(motorista){
          entrega.motorista = {
            id: motorista.id,
            nome: motorista.nome,
            image_file_name: motoristaImage.file_name,
          };
        }

        if(armazem){
          entrega.armazem = {
            nome: armazem.nome,
          }
        }

        if(entregaCarregandoQueue){
          entrega.envio_armazem = entregaCarregandoQueue.date;
          entrega.negocios = [{
              id: -1,
              quantidade: -1,
              notas_fiscais_itens: [{
                id: -1,
                quantidade: -1,
                valor_unitario: -1,
                valor_total: -1,
                nota_fiscal_emissao: entregaQueue.request.body.nota_fiscal.emissao,
                cfop: {
                  id: cfop.id,
                  numero: cfop.numero,
                  descricao: cfop.descricao,
                },
                nota_fiscal:{
                  numero: entregaQueue.request.body.nota_fiscal.numero,
                  emissao: entregaQueue.request.body.nota_fiscal.emissao,
                  nota_fiscal_serie:{
                    id: notaFiscalSerie.id,
                    nome: notaFiscalSerie.nome,
                    serie: notaFiscalSerie.serie,
                  }
                }
              }],
            negocio_cultura: {
                id: negocioCultura.id,
                quantidade: negocioCultura.quantidade,
                unidade_medida_sigla: negocioCulturaUnidadeMedida.sigla,
                prazo_entrega_final: negocioCultura.prazo_entrega_final,
                negocio: {
                  id: negocio.id,
                  pessoa: pessoaNegocio.nome,
                  tipo: tipoNegocio.nome,
                  emissao: negocio.emissao,
                  numero_pedido: negocio.numero_pedido,
                  numero_contrato: negocio.numero_contrato,
                },
              armazens: [{
                  id: negocioCulturaArmazens.map(armazem => {return armazem.id}),
              }],
              safra_cultura: {
                id: negocioCulturaSafraCultura.id,
                cultura:{
                  id: negocioCulturaSafraCulturaCultura.id,
                  default_unidade_pesagem_id: negocioCulturaSafraCulturaCultura.default_unidade_pesagem_id
                }
              }
            }
            }]
        }

        resolve(entrega);

      }else{
        if(navigator.onLine){
          EntregaAPI.getEntrega(id, this.produtorId).then(response => {
            resolve(response.data);
          }).catch(error => {
            reject(new Error("Erro na API"))
          })
        }else{
          this.entreaViewRepository.get(id).then(entrega => {
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
