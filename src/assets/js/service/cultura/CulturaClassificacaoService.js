import Vue from 'vue';
import CulturaClassificacaoAPI from "../../api/CulturaClassificacaoAPI";
import CulturaClassificacaoRepository from "../../repository/resource/CulturaClassificacaoRepository";
import ClassificacaoRepository from "../../repository/resource/ClassificacaoRepository";
import ClassificacaoAPI from "../../api/ClassificacaoAPI";

export default class CulturaClassificacaoService {
  #culturaClassificacaoRepository;
  #classificacaoRepository;

  constructor() {
    this.culturaClassificacaoRepository = new CulturaClassificacaoRepository();
    this.classificacaoRepository = new ClassificacaoRepository();
  }

  listClassificacoesByCultura(cultura_id){
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        CulturaClassificacaoAPI.listByCultura(cultura_id).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      }else{
        this.culturaClassificacaoRepository.getAllByCultura(cultura_id).then(culturasClassificacoes => {
          culturasClassificacoes = Promise.all(culturasClassificacoes.map(async culturaClassificacao => {
            let classificacao = await this.classificacaoRepository.getById(culturaClassificacao.classificacao_id);
            return {
              id: culturaClassificacao.id,
              nome: classificacao.nome,
              tolerancia: culturaClassificacao.tolerancia,
            }
          }));

          resolve(culturasClassificacoes);
        }).catch(error => {
          reject(error)
        })
      }
    });
  };
  getCulturasClassificacao(classificacaoId) {
    return new Promise((resolve, reject) => {
      CulturaClassificacaoAPI.getCulturasClassificacao(classificacaoId).then(response => {
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
  getCulturaClassificacaoById(culturaClassificacaoId) {
    return new Promise((resolve, reject) => {
      CulturaClassificacaoAPI.getCulturaClassificacaoById(culturaClassificacaoId).then(response => {
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
  addCulturaClassificacao(params) {
    return new Promise((resolve, reject) => {
      CulturaClassificacaoAPI.addCulturaClassificacao(params).then(response => {
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
  updateCulturaClassificacao(CulturaClassificacaoId, params) {
    return new Promise((resolve, reject) => {
      CulturaClassificacaoAPI.updateCulturaClassificacao(CulturaClassificacaoId, params).then(response => {
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
  deleteCulturaClassificacao(CulturaClassificacaoId) {
    return new Promise((resolve, reject) => {
      CulturaClassificacaoAPI.deleteCulturaClassificacao(CulturaClassificacaoId).then(response => {
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
