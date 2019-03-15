import Vue from 'vue'

export default class UserAPI{

  static getAccount(id){
    return Vue.prototype.$axios.get('account/' + id);
  }

  static listAccounts(filter){
    return Vue.prototype.$axios.get( 'account?' + filter);
  }

  static listProdutores(){
    return Vue.prototype.$axios.get( 'produtor' );
  }

  static listRoles(){
    return Vue.prototype.$axios.get('role');
  }

  static saveProdutor(produtor){
    return Vue.prototype.$axios.post('produtor', produtor);
  }

  static saveAccount(account){
    return Vue.prototype.$axios.post('account', account);
  }

  static updateAccount(account, id){
    return Vue.prototype.$axios.put('account/' + id, account);
  }
}
