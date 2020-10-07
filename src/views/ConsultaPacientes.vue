<template>
  <v-container class="centered">

    <v-row><h2>Consulta Pacientes</h2></v-row>
    <Lista/>
  </v-container>
</template>

<script>

import Lista from '@/components/ListaPacientes.vue'

export default {
  components: {

    Lista
  }
}
</script>
<style scoped>
    .centered {
        margin: 0 auto;
    }
</style>