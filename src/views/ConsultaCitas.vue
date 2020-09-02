<template>
  <v-container>
       <Sidebar />
    <v-row><h2>Consulta Citas</h2></v-row>
    <v-row>
      <v-col sm="2" offset-lg="1">
        <!--Sidebar /-->
      </v-col>
      <v-col >
        <ListaCitas/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import ListaCitas from '@/components/ListaCitas.vue'

export default {
  components: {
    Sidebar,
    ListaCitas
  }
}
</script>
