import Vue from 'vue'
import Vuex from 'vuex'

const firebase = require('firebase/app')

import router from '../router'

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
        router.push({ name: 'inicio' })
      })
      .catch((resolve) => {
        commit('setError', resolve.message)
      })
    },

    ingresoUsuario({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
      .then((response) => {
        commit('setUsuario', { email: response.user.email, uid: response.user.uid})
        router.push({ name: 'inicio' })
      })
      .catch((resolve) => {
        commit('setError', resolve.message)
      })
    },

    detectarUsuario({ commit }, payload) {
      if (payload != null) {
        commit('setUsuario', { email: payload.email, uid: payload.uid })
      } else {
        commit('setUsuario', null)
      }
    },

    cerrarSesion({ commit }) {
      firebase.auth().signOut();
      commit('setUsuario', null)
      router.push({ name: 'ingreso' })
    }
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false;
      } else{
        return true
      }
    }
  }
})
