import Vue from 'vue'

export default class TypeAPI{
  static all(){
    return Vue.prototype.$axios.get('/utils/types');
  }
}
