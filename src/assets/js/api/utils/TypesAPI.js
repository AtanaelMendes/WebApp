import Vue from 'vue'

export default class TypesAPI{
  static all(){
    return Vue.prototype.$axios.get('/utils/types');
  }
}
