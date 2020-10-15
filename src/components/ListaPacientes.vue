<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="api_pacientes"
      item-key="idSolicitudAyuda"
      :search="search"
      calculate-widths
      class="elevation-6"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Pacientes</v-toolbar-title>
          <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Búsqueda"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="mr-2"
        @click="gotoDetails(item)"
      >
        mdi-play
      </v-icon>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getPacientes();
  },
  data: () => ({
    selectTipoSolicitud: [],
    headers: [
      {
        text: "Nombres",
        align: "left",
        value: "nombre",
        width: "215px",
      },
      {
        text: "DNI",
        align: "left",
        value: "dniEstudiante",
        width: "215px",
      },
      { text: "Colegio", value: "nombreColegio", align: "left" },
      { text: 'Ir a detalles', value: 'actions', sortable: false, align: "center" },
      // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
      // { text: '', value: 'actions', sortable: false,width: '240px', align: 'center', justify: 'center',},
    ],
    dateIni: new Date().toISOString().substr(0, 10),
    dateFin: new Date().toISOString().substr(0, 10),
    menuIni: false,
    menuFin: false,
    search: "",
    api_pacientes: [],
  }),
  methods: {
    async getPacientes() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaPacientes/consultas/pacientes",
          {
            //crossDomain: true,
            params: {
              idAuEspecialista: localStorage.userID,
            },
          }
        );
        console.log(res);
        this.api_pacientes = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    gotoDetails( item ) {
      this.$router.push(`paciente_detalle?dni=${item.dniEstudiante}`);
    }
  },
};
</script>
