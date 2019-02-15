import Vue from 'vue'
import Vuex from 'vuex'

import entrega from './entrega'
import account from './account'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    entrega,
    account,
  }
});

export default store
