import Vue from 'vue'

export default class RoleAPI {
  static listRoles(){
    return Vue.prototype.$axios.get('role');
  }
}
