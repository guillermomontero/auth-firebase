import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import App from './App.vue'
import router from './router'
import store from './store'

const firebase = require('firebase/app')

// Add additional services that you want to use
require('firebase/auth');
// require('firebase/database');
require('firebase/firestore');
// require('firebase/messaging');
// require('firebase/functions');

const firebaseConfig = {
  apiKey: "AIzaSyC1e-jtGJuwjXovv7Hsa_ON1aHckakoVj4",
  authDomain: "auth-firebase-32dd3.firebaseapp.com",
  databaseURL: "https://auth-firebase-32dd3.firebaseio.com",
  projectId: "auth-firebase-32dd3",
  storageBucket: "auth-firebase-32dd3.appspot.com",
  messagingSenderId: "1060141473854",
  appId: "1:1060141473854:web:dfa1e5cf51e8d57390316f"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore()
export default firebaseApp.firestore()

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('detectarUsuario', { email: user.email, uid: user.uid })
  } else {
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


