<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({ email: email, pass: pass1})">
      <input type="email" v-model="$v.email.$model" placeholder="Email" class="form-control my-2">
      <small class="text-danger d-block" v-if="!$v.email.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.email.email">Email no válido</small>
      <input type="password" v-model="$v.pass1.$model" placeholder="Contraseña" class="form-control my-2">
      <small class="text-danger d-block" v-if="!$v.pass1.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.pass1.minLength">Mínimo 6 carácteres</small>
      <input type="password" v-model="pass2" placeholder="Repita la contraseña" class="form-control my-2">
      <small class="text-danger d-block" v-if="!$v.pass2.sameAs">La contraseña no coincide</small>
      <button type="submit" :disabled="!desactivar" class="btn btn-info">Crear usuario</button>
    </form>
    <p v-if="error === 'auth/email-already-in-use'">El email ya está registrado</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

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
  },
  validations: {
    email: {
      required,
      email
    },
    pass1: {
      required,
      minLength: minLength(6)
    },
    pass2: {
      sameAs: sameAs('pass1')
    }
  }
}
</script>
