import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import NegocioCulturaAPI from "../../api/NegocioCulturaAPI";
import NegocioRepository from "../../repository/reource/NegocioRepository";
import NegocioCulturaRepository from "../../repository/reource/NegocioCulturaRepository";
import UnidadeRepository from "../../repository/reource/UnidadeRepository";
import SafraCulturaRepository from "../../repository/reource/SafraCulturaRepository";
import CulturaRepository from "../../repository/reource/CulturaRepository";
import PessoaRepository from "../../repository/reource/PessoaRepository";
import NegocioCulturaArmazemRepository from "../../repository/reource/NegocioCulturaArmazemRepository";
import ArmazemRepository from "../../repository/reource/ArmazemRepository";
import LocalizacaoRepository from "../../repository/reource/LocalizacaoRepository";
import EntregaNegocioRepository from "../../repository/reource/EntregaNegocioRepository";
const produtorId = localStorage.getItem('account.produtor_id');
export default class NegocioService{
  #produtorId;
  #negocioRepository;
  #negocioCulturaRepository;
  #unidadeRepository;
  #safraCulturaRepository;
  #culturaRepository;
  #pessoaRepository;
  #negocioCulturaArmazemRepository;
  #armazemRepository;
  #localizacaoRepository;
  #entregaNegocioRepository;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.negocioRepository = new NegocioRepository();
    this.negocioCulturaRepository = new NegocioCulturaRepository();
    this.unidadeRepository = new UnidadeRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.pessoaRepository = new PessoaRepository();
    this.negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
    this.armazemRepository = new ArmazemRepository();
    this.localizacaoRepository = new LocalizacaoRepository();
    this.entregaNegocioRepository = new EntregaNegocioRepository();
  }

  listTipoNegocios(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/tipo_negocio').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  }

  listNegocios(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/negocio').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  }

  getNegocioById(id, fullType = false){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/negocio/'+ id + (fullType ? '?type=full' : '')).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  }

  saveNegocio(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/negocio', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  updateNegocio(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  archiveNegocio(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  restoreNegocio(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/' + id +'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteNegocio(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ produtorId + '/negocio/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  saveAttachCultura(negocioId, negocioCultura){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('negocio/'+ negocioId + '/cultura', negocioCultura).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteCultura(negocioId, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('negocio/'+ negocioId + '/cultura/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  listNegociosCulturas(negocioId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('negocio/'+ negocioId + '/cultura?filter=without_empty').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  listNegociosCulturasByProdutor(){
    return new Promise(async (resolve, reject) => {
      if(navigator.onLine) {
        NegocioCulturaAPI.getByProdutor(this.produtorId).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject()
        })
      }else{
        let negociosCulturas = await this.negocioCulturaRepository.getAllOrdered();

        negociosCulturas = await Promise.all(negociosCulturas.map(async negocioCultura => {
          let negocio = await this.negocioRepository.getById(negocioCultura.negocio_id);
          let safraCultura = await this.safraCulturaRepository.getById(negocioCultura.safra_cultura_id);
          let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
          let negocioCulturaUnidade = await this.unidadeRepository.getById(negocioCultura.unidade_medida_id);
          let pessoa = await this.pessoaRepository.getById(negocio.pessoa_id);
          let entregasNegocios = await this.entregaNegocioRepository.getAllByNegocioCulturaId(negocioCultura.id);
          let quantidadeEntregue = 0;
          let entregasPendentes = 0;

          for(let entregaNegocio of entregasNegocios){
            if(entregaNegocio.quantidade === null || entregaNegocio.quantidade === undefined){
              entregasPendentes++;
            }
            quantidadeEntregue += entregaNegocio.quantidade;
          }

          return {
            id: negocioCultura.id,
            prazo_entrega_final: negocioCultura.prazo_entrega_final,
            quantidade: negocioCultura.quantidade,
            quantidade_entregue: quantidadeEntregue,
            quantidade_restante: negocioCultura.quantidade - quantidadeEntregue,
            entregas_pendentes: entregasPendentes,
            unidade_medida_sigla: negocioCulturaUnidade.sigla,
            safra_cultura: {
              id: safraCultura.id,
              cultura: {
                id: cultura.id,
                default_unidade_pesagem_id: negocioCulturaUnidade.id,
              }
            },
            negocio: {
              pessoa: pessoa.nome,
              numero_contrato: negocio.numero_contrato,
              numero_pedido: negocio.numero_pedido,
            },
          }
        }));

        resolve(negociosCulturas);
      }
    });
  }

  listAvaliablesNegociosCulturasForEntrega($entregaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('negocio/cultura/by_entrega/' + $entregaId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  listArmazensByNegocioCultura(negocioCulturaId){
    return new Promise(async (resolve, reject) => {
      if(navigator.onLine) {
        NegocioCulturaAPI.listArmazensByNegocioCultura(negocioCulturaId).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
      }else{
        let negociosCulturasArmazens = await this.negocioCulturaArmazemRepository.getAllByNegocioCultura(negocioCulturaId);

        negociosCulturasArmazens = await Promise.all(negociosCulturasArmazens.map(async negocioCulturaArmazem => {
          let armazem = await this.armazemRepository.getById(negocioCulturaArmazem.armazem_id);
          let localizacao = await this.localizacaoRepository.getById(armazem.localizacao_id);
          let endereco = localizacao.endereco + ', ' + localizacao.numero + '  ' + localizacao.bairro + ' - ' + localizacao.cidade.nome + '/' + localizacao.cidade.estado.nome;
          return {
            id: armazem.id,
            nome: armazem.nome,
            endereco: endereco,
          }
        }));

        resolve(negociosCulturasArmazens);
      }
    });
  }

  saveAttachTitulo(negocioId, negocioTitulo){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('negocio/'+ negocioId + '/titulo', negocioTitulo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteTitulo(negocioId, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('negocio/'+ negocioId + '/titulo/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  saveAttachProduto(negocioId, negocioProduto){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('negocio/'+ negocioId + '/produto', negocioProduto).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteProduto(negocioId, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('negocio/'+ negocioId + '/produto/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  saveAttachFixacao(negocioCulturaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('negocio_cultura/'+ negocioCulturaId + '/fixacao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  }
}
