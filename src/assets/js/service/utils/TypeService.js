import TypeAPI from "../../api/utils/TypeAPI";
import Vue from 'vue';
import store from '../../../../store';

export default class TypeService{

  static ID_POSITION = 0;
  static KEY_POSITION = 1;
  static LABEL_POSITION = 2;

  constructor() {
    this.all();
  }

  all () {
    return new Promise((resolve, reject) => {
      TypeAPI.all().then((response) => {
        store.state.type = response.data;
      }).catch(error => {
        reject(error);
      })
    });
  }

  itemsByType (type) {
    if (typeof store.state.type[type] === 'undefined') {
      throw "Tipo '" + type + "' Inexistente";
    }
    return store.state.type[type];
  }

  optionsByType (type) {
    let items = this.itemsByType(type);
    var ret = [];
    items.forEach(function (item) {
      ret.push({
        label: item[TypeService.LABEL_POSITION],
        value: item[TypeService.ID_POSITION],
      });
    });
    return ret;
  }

  itemById (type, id) {
    var items = this.itemsByType(type);
    var item = items.filter(function(item) {
      return item[TypeService.ID_POSITION] == id;
    });
    if (item.length == 0) {
      throw "Id '" + id + "' Inexistente para o Tipo '" + type + "'";
    }
    return item[0];
  }

  itemByKey (type, key) {
    var items = this.itemsByType(type);
    var item = items.filter(function(item) {
        return item[TypeService.KEY_POSITION] == key;
    });
    if (item.length == 0) {
      throw "Chave '" + key + "' Inexistente para o Tipo '" + type + "'";
    }
    return item[0];
  }

  keyById (type, id) {
    if (id == null) {
      return null;
    }
    var item = this.itemById(type, id);
    return item[TypeService.KEY_POSITION];
  }

  labelById (type, id) {
    if (id == null) {
      return null;
    }
    var item = this.itemById(type, id);
    return item[TypeService.LABEL_POSITION];
  }

  idByKey (type, key) {
    if (key == null) {
      return null;
    }
    var item = this.itemByKey(type, key);
    return item[TypeService.ID_POSITION];
  }

  labelByKey (type, key) {
    if (key == null) {
      return null;
    }
    var item = this.itemByKey(type, key);
    return item[TypeService.LABEL_POSITION];
  }

}
