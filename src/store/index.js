import Vue from 'vue'
import Vuex from 'vuex'

const firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario : '',
    error: ''
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setError(state, payload) {
      state.error = payload
    }
  },
  actions: {
    crearUsuario({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
      .then((response) => {
        commit('setUsuario', { email: response.user.email, uid: response.user.uid})
      })
      .catch((resolve) => {
        commit('setError', resolve.message)
      })
    }
  },
})
