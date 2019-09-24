import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user_type: localStorage.getItem('user_type') || '',
    login: localStorage.getItem('login') || ''
  },
  mutations: {

  },
  actions: {

  }
})
