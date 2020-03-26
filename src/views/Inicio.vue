<template>
  <div>
    <h1>Lista de tareas</h1>
    <router-link :to="{ name: 'agregar' }">
      <button class="btn btn-success btn-block">Agregar</button>
    </router-link>

    <form @submit.prevent="buscador(texto)">
      <input type="text" placeholder="Buscar" class="form-control mt-5" v-model="texto" v-on:keyup="buscador(texto)">
    </form>

    <div v-if="carga" class="text-center mt-5">
      <h3>Cargando contenido...</h3>
      <pulse-loader :loading="carga"></pulse-loader>
    </div>

    <ul class="list-group mt-5">
      <li
        v-for="item of arrayFiltrado"
        :key="item.id"
        class="list-group-item"
      >
        {{ item.nombre }}
        <div class="float-right">
          <router-link
            :to="{ name: 'editar', params: { id: item.id }}"
            class="btn btn-warning btn-sm mr-2"
          >
            Editar
          </router-link>
          <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'Inicio',
  data() {
    return {
      texto: ''
    }
  },
  components: {
    PulseLoader
  },
  computed: {
    ...mapState(['usuario', 'tareas', 'carga']),
    ...mapGetters(['arrayFiltrado'])
  },
  methods: {
    ...mapActions(['getTareas', 'eliminarTarea', 'buscador'])
  },
  created() {
    if(this.usuario !== null || this.usuario !== '' || this.usuario !== undefined) {
      this.getTareas()
    }
  }
}
</script>