<template>
  <v-card max-width="625" class="elevation-10">
    <v-img
      src="https://akns-images.eonline.com/eol_images/Entire_Site/2017411/rs_600x600-170511060426-600.gypsy-naomi-watts.ch.051117.jpg?fit=around|700:700&output-quality=90&crop=700:700;center,top"
      height="430px"
      dark
    >
    </v-img>

    <v-card-title class="white--text" style="backgroundcolor: #03a9f4">
      <v-row class="display-1" justify="center">{{ this.nombres }}</v-row>
    </v-card-title>

    <v-list two-line>
      <v-row class="no-margin">
        <v-col>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue">mdi-phone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ this.celular }}</v-list-item-title>
              <v-list-item-subtitle>Numero personal</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue">mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ this.dni }}</v-list-item-title>
              <v-list-item-subtitle>DNI</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue">mdi-email</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ this.correo }}</v-list-item-title>
              <v-list-item-subtitle>Correo personal</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getDatosUsuario();
  },
  data: () => ({
    nombres: "",
    celular: "",
    correo: "",
    dni: "",
  }),

  methods: {
    async getDatosUsuario() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net​/api/LoginWeb/Consultar/DatosPersonales/DatosPersonales",
          {
            //crossDomain: true,
            params: {
              idEspecialista: localStorage.userID,
              token: localStorage.accessToken,
            },
          }
        );
        this.nombres = res.data[0].primerNombre;
        this.celular = res.data[0].celular;
        this.correo = res.data[0].correo;
        this.dni = res.data[0].dni;
        /*this.name = (res.data[0].b.primerNombre).concat(" ").concat(res.data[0].b.segundoNombre)
        this.apellido = (res.data[0].b.apellidoPaterno).concat(" ").concat(res.data[0].b.apellidoMaterno)
        this.celular = (res.data[0].b.celularEstudiante)
        this.correo = (res.data[0].b.correoEstudiante)
        this.idEstudiante = (res.data[0].b.idEstudiante)*/
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
.no-margin {
  margin: 0;
}
</style>

