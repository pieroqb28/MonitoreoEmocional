<template>
  <v-container>

    <v-row><h2>Asignar Paciente</h2></v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <!--v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>  
    <v-row><h3>Datos Estudiante</h3></v-row-->
    <v-row>

      <v-col >
        <FormPaciente/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import FormPaciente from '@/components/FormPaciente.vue'

export default {
  components: {
    FormPaciente
  }
}
</script>
