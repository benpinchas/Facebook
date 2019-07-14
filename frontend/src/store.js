import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import UserStore from './modules/UserStore.js'
import PostStore from './modules/PostStore.js'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    UserStore,
    PostStore
  }
})
