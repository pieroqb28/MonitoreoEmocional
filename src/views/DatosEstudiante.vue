<template>
  <v-container>
       <!--Sidebar /-->
    <v-row><h2>Datos Estudiante</h2></v-row>
    <v-row>

        <Estudiante />

    </v-row>
    <v-row>
      <v-col sm="3" offset-lg="-1">
        <!--Sidebar /-->
      </v-col>
      <v-col sm="9" lg="7">
    
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

//import Sidebar from '@/components/Sidebar.vue'
import Estudiante from '@/components/Estudiante.vue'

export default {
  components: {
  //  Sidebar,
    Estudiante
  }
}
</script>
