<template>
  <div>
    <h1>Editar</h1>
    <form @submit.prevent="editarTarea(tarea)" class="form-inline">
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Nombre</div>
        </div>
        <input class="form-control" type="text" v-model="$v.tarea.nombre.$model">
      </div>
      <button type="submit" class="btn btn-primary mb-2" :disabled="$v.tarea.$invalid">Editar</button>
    </form>
    <small class="text-danger" v-if="!$v.tarea.nombre.required">Campo requerido</small>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'Editar',
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    ...mapState(['tarea'])
  },
  methods: {
    ...mapActions(['getTarea', 'editarTarea']),
  },
  validations: {
    tarea: {
      nombre: {
        required
      }
    }
  },
  created() {
    this.getTarea(this.id);
  }
}
</script>