<template>
  <v-container>

    <v-row><h2>Crear Seccion</h2></v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <!--v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>  
    <v-row><h3>Datos Estudiante</h3></v-row-->
    <v-row>
      <v-col >
        <FormSeccion/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import FormSeccion from '@/components/FormSeccion.vue'

export default {
  components: {
    FormSeccion
  }
}
</script>
