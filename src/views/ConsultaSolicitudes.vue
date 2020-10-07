<template>
  <v-container>

    <v-row><h2>Solicitudes de ayuda</h2></v-row>
    <v-row>

      <v-col >
        <ListaSolicitudes/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListaSolicitudes from '@/components/ListaSolicitudes.vue'

export default {
  components: {

    ListaSolicitudes
  }
}
</script>
