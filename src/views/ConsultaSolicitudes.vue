<template>
  <v-container>

    <v-row><h2>Solicitudes de ayuda</h2></v-row>
    <v-row>
      <v-col sm="2" offset-lg="1">
        <!--Sidebar /-->
      </v-col>
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
