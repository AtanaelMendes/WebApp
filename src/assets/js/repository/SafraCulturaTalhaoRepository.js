import Vue from 'vue'
import SafraCulturaTalhao from "../dbModel/SafraCulturaTalhao";

let table = Vue.prototype.db.safra_culturas_talhoes;

export default class SafraCulturaTalhaoRepository {
  getById(id){
    return table.get({id: id});
  };

  update(safraCulturaTalhao){
    if(!(safraCulturaTalhao instanceof SafraCulturaTalhao)){
      throw new Error('Objeto não é do tipo SafraCulturaTalhao!');
    }
    return table.put(safraCulturaTalhao)
  };
}
