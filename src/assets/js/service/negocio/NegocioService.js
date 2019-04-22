import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import NegocioCulturaAPI from "../../api/NegocioCulturaAPI";
import NegocioRepository from "../../repository/resource/NegocioRepository";
import NegocioCulturaRepository from "../../repository/resource/NegocioCulturaRepository";
import UnidadeRepository from "../../repository/resource/UnidadeRepository";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import PessoaRepository from "../../repository/resource/PessoaRepository";
import NegocioCulturaArmazemRepository from "../../repository/resource/NegocioCulturaArmazemRepository";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import LocalizacaoRepository from "../../repository/resource/LocalizacaoRepository";
import NegocioCulturaMovimentoRepository from "../../repository/resource/NegocioCulturaMovimentoRepository";
import NegocioAPI from "../../api/NegocioAPI";
import NegocioTituloAPI from "../../api/NegocioTituloAPI";
import NegocioProdutoAPI from "../../api/NegocioProdutoAPI";
import NegocioFixacaoAPI from "../../api/NegocioFixacaoAPI";

export default class NegocioService{
  #negocioRepository;
  #negocioCulturaRepository;
  #unidadeRepository;
  #safraCulturaRepository;
  #culturaRepository;
  #pessoaRepository;
  #negocioCulturaArmazemRepository;
  #armazemRepository;
  #localizacaoRepository;
  #negocioCulturaMovimentoRepository;

  constructor() {
    this.negocioRepository = new NegocioRepository();
    this.negocioCulturaRepository = new NegocioCulturaRepository();
    this.unidadeRepository = new UnidadeRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.pessoaRepository = new PessoaRepository();
    this.negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
    this.armazemRepository = new ArmazemRepository();
    this.localizacaoRepository = new LocalizacaoRepository();
    this.negocioCulturaMovimentoRepository = new NegocioCulturaMovimentoRepository();
  }

  listTipoNegocios(){
    return new Promise((resolve, reject) => {
      NegocioAPI.listTiposNegocios().then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listNegocios(){
    return new Promise((resolve, reject) => {
      NegocioAPI.listNegocios().then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getNegocioById(id, fullType = false){
    return new Promise((resolve, reject) => {
      NegocioAPI.getById(id, fullType).then( response => {
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

  saveNegocio(negocio){
    return new Promise((resolve, reject) => {
      NegocioAPI.saveNegocio(negocio).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  updateNegocio(id, negocio){
    return new Promise((resolve, reject) => {
      NegocioAPI.updateNegocio(negocio, id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  archiveNegocio(id){
    return new Promise((resolve, reject) => {
      NegocioAPI.archiveNegocio(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  restoreNegocio(id){
    return new Promise((resolve, reject) => {
      NegocioAPI.restoreNegocio(id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteNegocio(id){
    return new Promise((resolve, reject) => {
      NegocioAPI.deleteNegocio(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  /*Negocio Cultura*/
  saveAttachCultura(negocioId, negocioCultura){
    return new Promise((resolve, reject) => {
      NegocioCulturaAPI.addNegocioCultura(negocioCultura, negocioId).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteCultura(negocioId, id){
    return new Promise((resolve, reject) => {
      NegocioCulturaAPI.deleteNegocioCultura(id, negocioId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  listNegociosCulturasWithoutEmpty(negocioId){
    return new Promise((resolve, reject) => {
      NegocioCulturaAPI.listNegociosCulturas(negocioId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  listNegociosCulturas(filter){
    return new Promise(async (resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        NegocioCulturaAPI.getByProdutor(filter).then(response => {
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
          let negociosCulturasMovimentos = await this.negocioCulturaMovimentoRepository.ggetAllByNegocioCulturaId(negocioCultura.id);
          let quantidadeEntregue = 0;
          let entregasPendentes = 0;

          for(let negocioCulturaMovimento of negociosCulturasMovimentos){
            if(negocioCulturaMovimento.quantidade === null || negocioCulturaMovimento.quantidade === undefined){
              entregasPendentes++;
            }
            quantidadeEntregue += parseFloat(negocioCulturaMovimento.quantidade);
          }

          return {
            id: negocioCultura.id,
            prazo_entrega_final: negocioCultura.prazo_entrega_final,
            quantidade: parseFloat(negocioCultura.quantidade),
            quantidade_entregue: quantidadeEntregue,
            quantidade_restante: parseFloat(negocioCultura.quantidade - quantidadeEntregue),
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

  listAvaliablesNegociosCulturasForEntrega(entregaId){
    return new Promise((resolve, reject) => {
      NegocioCulturaAPI.listNegociosCulturasByEntrega(entregaId).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  listArmazensByNegocioCultura(negocioCulturaId){
    return new Promise(async (resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
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

  /*Negócio Titulo*/
  saveAttachTitulo(negocioId, negocioTitulo){
    return new Promise((resolve, reject) => {
      NegocioTituloAPI.saveNegocioTitulo(negocioTitulo, negocioId).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteTitulo(negocioId, id){
    return new Promise((resolve, reject) => {
      NegocioTituloAPI.deleteNegocioTitulo(id, negocioId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  /*Negócio Produto*/
  saveAttachProduto(negocioId, negocioProduto){
    return new Promise((resolve, reject) => {
      NegocioProdutoAPI.saveNegocioProduto(negocioProduto, negocioId).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteProduto(negocioId, id){
    return new Promise((resolve, reject) => {
      NegocioProdutoAPI.deleteNegocioProduto(id, negocioId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  /*Negócio Fixacao*/
  saveAttachFixacao(negocioCulturaId, params){
    return new Promise((resolve, reject) => {
      NegocioFixacaoAPI.saveNegocioFixacao(params, negocioCulturaId).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteFixacao(negocioCulturaId, id){
    return new Promise((resolve, reject) => {
      NegocioFixacaoAPI.deleteFixacao(id, negocioCulturaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }

  deleteTituloFixacao(id, fixacaoId, negocioCulturaId){
    return new Promise((resolve, reject) => {
      NegocioFixacaoAPI.deleteTituloFixacao(id, fixacaoId, negocioCulturaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  }
}
