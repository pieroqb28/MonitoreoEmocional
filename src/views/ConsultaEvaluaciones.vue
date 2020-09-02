<template>
  <v-container>
       <Sidebar />
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
import Sidebar from '@/components/Sidebar.vue'
import ListaEvaluaciones from '@/components/ListaEvaluaciones.vue'

export default {
  components: {
    Sidebar,
    ListaEvaluaciones
  }
}
</script>
