import Vue from 'vue'
import Vuex from 'vuex'
import db from '../main'

const firebase = require('firebase/app')

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario : '',
    error: '',
    tareas: [],
    tarea: {nombre: '', id: ''},
    carga: false,
    texto: ''
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setTareas(state, tareas) {
      state.tareas = tareas;
    },
    setTarea(state, tarea) {
      state.tarea = tarea;
    },
    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter((doc) => {
        return doc.id != id;
      })
    },
    cargarFirebase(state, payload) {
      state.carga = payload
    }
  },
  actions: {
    buscador({ commit, state }, payload) {
      state.texto = payload.toLowerCase();
    },
    crearUsuario({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
      .then((response) => {
        commit('setUsuario', { email: response.user.email, uid: response.user.uid})
        // Creamos una colección por defecto
        db.collection(response.user.email).add({
          nombre: 'Tarea de ejemplo'
        })
        .then(() => {
          // LLevamos al usuario a la página de inicio
          router.push({ name: 'inicio' })
        })
        .catch((resolve) => {
          console.log(resolve)
          commit('setError', resolve.code)
        })
      })
      .catch((resolve) => {
        console.log(resolve)
        commit('setError', resolve.code)
      })
    },

    ingresoUsuario({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
      .then((response) => {
        commit('setUsuario', { email: response.user.email, uid: response.user.uid})
        router.push({ name: 'inicio' })
      })
      .catch((resolve) => {
        console.log(resolve)
        commit('setError', resolve.code)
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
    },

    getTareas({ commit }) {
      commit('cargarFirebase', true)
      const usuario = firebase.auth().currentUser;
      const tareas = [];
      db.collection(usuario.email).get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          let tarea = doc.data();
          tarea.id = doc.id;
          tareas.push(tarea);
        })
        commit('cargarFirebase', false)
      });
      commit('setTareas', tareas);
    },

    getTarea({ commit }, id) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).get()
      .then((doc) => {
        let tarea = doc.data();
        tarea.id = doc.id;
        commit('setTarea', tarea)
      })
    },

    editarTarea({ commit }, tarea) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(() => {
        router.push({ name: 'inicio' })
      })
    },

    agregarTarea({ commit }, nombre) {
      commit('cargarFirebase', true)
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).add({
        nombre: nombre
      })
      .then(() => {
        commit('cargarFirebase', false)
        router.push({ name: 'inicio' })
      })
    },

    eliminarTarea({ commit }, id) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).delete()
      .then(() => {
        commit('eliminarTarea', id);
      })
    }
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false;
      } else{
        return true
      }
    },

    arrayFiltrado(state) {
      let arrFiltrado = [];
      for (let tarea of state.tareas) {
        let nombre = tarea.nombre.toLowerCase();
        if (nombre.indexOf(state.texto) >= 0) {
          arrFiltrado.push(tarea)
        }
      }
      return arrFiltrado;
    }
  }
})
