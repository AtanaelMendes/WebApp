import Vue from 'vue'

export default class UtilsAPI{

  static getAddressByCEP(cep){
    return Vue.prototype.$axios.get('/utils/getaddressbycep/' + cep);
  }
}
