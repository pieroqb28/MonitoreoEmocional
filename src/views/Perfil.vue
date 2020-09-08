<template>
  <v-container>

    <v-row><h2>Mi perfil</h2></v-row>
    <v-row>
      <v-col sm="3" >
        <!--Sidebar /-->
      </v-col>
      <v-col >
        <DatosUsuario/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatosUsuario from '@/components/DatosUsuario.vue'

export default {
  components: {

    DatosUsuario
  }
}
</script>
