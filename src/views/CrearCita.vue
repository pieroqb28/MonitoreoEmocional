<template>
  <v-container>

    <v-row><h2>Crear Cita</h2></v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <!--v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>  
    <v-row><h3>Datos Estudiante</h3></v-row-->
    <v-row>

      <v-col >
        <FormCita/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import FormCita from '@/components/FormCita.vue'

export default {
  components: {
    FormCita
  }
}
</script>
