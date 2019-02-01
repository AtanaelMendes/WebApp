import Vue from 'vue'
import Vuex from 'vuex'

import entrega from './entrega'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    entrega,
  }
})

export default store
