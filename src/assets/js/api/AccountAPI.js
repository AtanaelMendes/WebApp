import Vue from 'vue'

export default class AccountAPI{

  static getAccountInfo(){
    return Vue.prototype.$axios.get( 'account/info');
  }
}
