<template>
  <v-container>

    <v-row><h2>Asignar a sección</h2></v-row>
    <v-row>
      <v-col >
        <FormAsignarSeccion/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import FormAsignarSeccion from '@/components/FormAsignarSeccion.vue'

export default {
  components: {

    FormAsignarSeccion
  }
}
</script>

