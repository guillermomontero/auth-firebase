<template>
  <div>
    <h1>Ingreso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({ email: $v.email.$model, pass: $v.pass.$model })">
      <input type="email" v-model="$v.email.$model" placeholder="Email" class="form-control my-2">
      <small class="text-danger d-block" v-if="!$v.email.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.email.email">Email no válido</small>
      <input type="password" v-model="$v.pass.$model" placeholder="Contraseña" class="form-control my-2">
      <small class="text-danger d-block my-2" v-if="!$v.pass.required">Campo requerido</small>
      <small class="text-danger d-block my-2" v-if="!$v.pass.minLength">Mínimo 6 carácteres</small>
      <button type="submit" class="btn btn-info" :disabled="$v.$invalid">Acceder</button>
    </form>
    <p v-if="error === 'auth/user-not-found' || error === 'auth/wrong-password'">Usuario o contraseña incorrectos</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength, email } from 'vuelidate/lib/validators'

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
  },
  validations: {
    email: {
      required,
      email,
    },
    pass: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>