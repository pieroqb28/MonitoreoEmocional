<template>
  <v-container>

    <v-row><h2>Crear Evaluacion</h2></v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <!--v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>  
    <v-row><h3>Datos Estudiante</h3></v-row-->
    <v-row>

      <v-col >
        <FormEvaluacion/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import FormEvaluacion from '@/components/FormEvaluacion.vue'

export default {
  components: {
    FormEvaluacion
  }
}
</script>
