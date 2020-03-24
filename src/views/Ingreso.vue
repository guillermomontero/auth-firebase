<template>
  <div>
    <h1>Ingreso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({ email, pass })">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="pass" placeholder="Contraseña">
      <button type="submit">Acceder</button>
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Ingreso',
  data() {
    return {
      email: '',
      pass: ''
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['ingresoUsuario'])
  }
}
</script>