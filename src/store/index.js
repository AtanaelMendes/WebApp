import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import perfil from './perfil'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    example,
    perfil,
  }
})

export default store
