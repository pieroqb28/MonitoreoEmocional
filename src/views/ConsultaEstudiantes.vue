<template>
  <v-container>

    <v-row><h2>Consulta Estudiantes</h2></v-row>
    <v-row>

      <v-col >
        <Lista/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Lista from '@/components/Lista.vue'

export default {
  components: {

    Lista
  }
}
</script>
