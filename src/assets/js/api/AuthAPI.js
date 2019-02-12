import Vue from 'vue'

export default class AuthAPI{

  static login(credentials){
    return Vue.prototype.$axios.post('oauth/token', credentials);
  }
}
