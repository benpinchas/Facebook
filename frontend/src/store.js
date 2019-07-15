import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import UserStore from './modules/UserStore.js'
import PostStore from './modules/PostStore.js'
import FriendshipStore from './modules/FriendshipStore.js'
import NotificationStore from './modules/NotificationStore.js'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    UserStore,
    PostStore,
    FriendshipStore,
    NotificationStore
  }
})
