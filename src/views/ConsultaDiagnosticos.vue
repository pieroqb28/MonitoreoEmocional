<template>
  <v-container>

    <v-row><h2>Consulta Diagnósticos</h2></v-row>
    <v-row>

      <v-col >
        <ListaDiagnosticos/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListaDiagnosticos from '@/components/ListaDiagnosticos.vue'

export default {
  components: {

    ListaDiagnosticos
  }
}
</script>
