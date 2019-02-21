import CulturaClassificacaoAPI from "../../api/CulturaClassificacaoAPI";
import CulturaClassificacaoRepository from "../../repository/resource/CulturaClassificacaoRepository";
import ClassificacaoRepository from "../../repository/resource/ClassificacaoRepository";

export default class CulturaClassificacaoService {
  #culturaClassificacaoRepository;
  #classificacaoRepository;

  constructor() {
    this.culturaClassificacaoRepository = new CulturaClassificacaoRepository();
    this.classificacaoRepository = new ClassificacaoRepository();
  }

  listClassificacoesByCultura(cultura_id){
    return new Promise((resolve, reject) => {
      if(navigator.onLine) {
        CulturaClassificacaoAPI.listByCultura(cultura_id).then(response => {
          resolve(response.data);
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
  }
}
