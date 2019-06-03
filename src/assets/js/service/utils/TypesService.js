import TypesAPI from "../../api/utils/TypesAPI";
import Vue from 'vue'

export default class TypesService{

  types = [];

  static ID_POSITION = 0;
  static KEY_POSITION = 1;
  static DESCRIPTION_POSITION = 2;

  constructor() {
    this.all();
  }

  all () {
    console.log('Buscando da API Types')
    return new Promise((resolve, reject) => {
      TypesAPI.all().then((response) => {
        this.types = response.data;
      }).catch(error => {
        reject(error);
      })
    });
  }

  itemsByType (type) {
    if (typeof this.types[type] === 'undefined') {
      throw "Tipo '" + type + "' Inexistente";
    }
    return this.types[type];
  }

  itemById (type, id) {
    var items = this.itemsByType(type);
    var item = items.filter(function(item) {
      return item[TypesService.ID_POSITION] == id;
    });
    if (item.length == 0) {
      throw "Id '" + id + "' Inexistente para o Tipo '" + type + "'";
    }
    return item[0];
  }

  itemByKey (type, key) {
    var items = this.itemsByType(type);
    var item = items.filter(function(item) {
        return item[TypesService.KEY_POSITION] == key;
    });
    if (item.length == 0) {
      throw "Chave '" + key + "' Inexistente para o Tipo '" + type + "'";
    }
    return item[0];
  }

  keyById (type, id) {
      var item = this.itemById(type, id);
      return item[TypesService.KEY_POSITION];
  }

  descriptionById (type, id) {
      var item = this.itemById(type, id);
      return item[TypesService.DESCRIPTION_POSITION];
  }

  idByKey (type, key) {
    var item = this.itemByKey(type, key);
    return item[TypesService.ID_POSITION];
  }

  descriptionByKey (type, key) {
    var item = this.itemByKey(type, key);
    return item[TypesService.DESCRIPTION_POSITION];
  }

}
