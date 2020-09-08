<template>
  <v-container>
    <v-row><h2>Consulta Evaluaciones</h2></v-row>
    <v-row>
      <v-col sm="2" offset-lg="1">
        <!--Sidebar /-->
      </v-col>
      <v-col >
        <ListaEvaluaciones/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import ListaEvaluaciones from '@/components/ListaEvaluaciones.vue'

export default {
  components: {

    ListaEvaluaciones
  }
}
</script>
