<template>
  <div>
    <h1>Editar</h1>
    <form @submit.prevent="editarTarea(tarea)" class="form-inline">
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Nombre</div>
        </div>
        <input class="form-control" type="text" v-model="tarea.nombre">
      </div>
      <button type="submit" class="btn btn-primary mb-2">Editar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  created() {
    this.getTarea(this.id);
  }
}
</script>