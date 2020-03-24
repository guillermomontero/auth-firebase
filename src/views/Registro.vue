<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({ email: email, pass: pass1})">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="pass1" placeholder="Contraseña">
      <input type="password" v-model="pass2" placeholder="Repita la contraseña">
      <button type="submit" :disabled="!desactivar">Crear usuario</button>
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Registro',
  data() {
    return {
      email: '',
      pass1: '',
      pass2: ''
    }
  },
  computed: {
    ...mapState(['error']),

    desactivar() {
      return this.pass1 === this.pass2 && this.pass1 !== '';
    }
  },
  methods: {
    ...mapActions(['crearUsuario'])
  }
}
</script>
