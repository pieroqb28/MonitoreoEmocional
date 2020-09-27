<template>
  <v-container>

    <v-row><h2>Crear Actividad</h2></v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <!--v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>  
    <v-row><h3>Datos Estudiante</h3></v-row-->
    <v-row>
      <v-col sm="1" offset-lg="1">
        <!--Sidebar /-->
      </v-col>
      <v-col >
        <FormActividad/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import FormActividad from '@/components/FormActividad.vue'

export default {
  components: {
    FormActividad
  }
}
</script>
