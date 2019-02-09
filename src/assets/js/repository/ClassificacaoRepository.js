import Vue from 'vue'
import Classificacao from "../dbModel/Classificacao";

let table = Vue.prototype.db.classificacoes;

export default class ClassificacaoRepository {
  update(classificacao){
    if(!(classificacao instanceof Classificacao)){
      throw new Error('Objeto não é do tipo Classificacao!');
    }
    return table.put(classificacao)
  }
}
