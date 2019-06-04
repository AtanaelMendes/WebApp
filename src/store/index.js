import Vue from 'vue'
import Vuex from 'vuex'

import entrega from './entrega'
import type from './type'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    entrega,
    type,
  }
});

export default store
