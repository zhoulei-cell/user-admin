import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    [TYPES.SET_IS_LOGIN](state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    setLogin({ commit }, payload) {
      commit(TYPES.SET_IS_LOGIN, payload)
    }
  }
})
