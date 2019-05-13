import Vue from 'vue'

export default class AccountAPI{

  static getAccount(id){
    return Vue.prototype.$axios.get('account/' + id);
  }

  static listAccounts(filter){
    return Vue.prototype.$axios.get( 'account' + (filter ? "?"+filter : ''));
  }

  static saveAccount(account){
    return Vue.prototype.$axios.post('account', account);
  }

  static updateAccount(account, id){
    return Vue.prototype.$axios.put('account/' + id, account);
  }

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
