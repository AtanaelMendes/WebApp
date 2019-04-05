import Vue from 'vue'

export default class AccountAPI{

  static getAccountInfo(){
    return Vue.prototype.$axios.get( 'account/info');
  }

  static updateAccountInfo(account){
    return Vue.prototype.$axios.put('account/info', account);
  }

  static changePassword(account){
    return Vue.prototype.$axios.put('account/change_password', account);
  }

  static logout(){
    return Vue.prototype.$axios.post('account/logout');
  }
}
