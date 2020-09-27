<template>
  <v-container>
    <v-row><h4>Filtros</h4></v-row>
    <v-row v-if="rol === 'TUTOR'">
      <v-col cols="6">
        <v-combobox
          v-model="selectColegio"
          :items="api_colegios"
          placeholder="-"
          label="Institución educativa"
          @change="getSecciones()"
        ></v-combobox>
      </v-col>
      <v-col cols="6">
        <v-combobox
          v-model="selectSeccion"
          :items="api_secciones"
          label="Sección"
          @change="getCitasTutor()"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-menu
          v-model="menuIni"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="190px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateIni"
              label="Fecha de Inicio"
              prepend-icon="mdi-calendar-month"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateIni"
            @input="menuIni = false"
            locale="es"
            color="light-blue"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="menuFin"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="190px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFin"
              label="Fecha de fin"
              prepend-icon="mdi-calendar-month"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateFin"
            @input="menuFin = false"
            locale="es"
            color="light-blue"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="api_citas"
        item-key="idCita"
        no-results-text="Búsqueda sin coincidencias"
        no-data-text="No hay citas disponibles"
        :search="search"
        calculate-widths
        class="elevation-6"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista de Citas</v-toolbar-title>
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
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    if (this.rol === "TUTOR") {
      this.getColegios();
    }
    if (this.rol === "ESPECIALISTA") {
      this.getCitasEspecialista();
    }
  },
  data: () => ({
    selectColegio: [],
    selectSeccion: [],
    dialog: false,
    headers: [
      {
        text: "Fecha",
        align: "left",
        value: "fechaInicio",
        width: "230px",
      },
      {
        text: "Hora programada",
        align: "left",
        value: "horaCita",
        width: "230px",
      },
      {
        text: "Especialista",
        align: "left",
        value: "nombreEspecialista",
        width: "230px",
      },
      {
        text: "Descripción",
        align: "left",
        value: "descripcion",
        width: "230px",
      },
      {
        text: "Estado",
        align: "left",
        value: "contenido",
        width: "230px",
      },
      // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
      //{ text: '', value: 'actions', sortable: false,width: '240px', align: 'center', justify: 'center',},
    ],
    dateIni: new Date().toISOString().substr(0, 10),
    dateFin: new Date().toISOString().substr(0, 10),
    menuIni: false,
    menuFin: false,
    search: "",

    api_colegios: [],
    api_secciones: [],
    api_citas: [],
    rol: localStorage.userRole,
  }),

  methods: {
    async getColegios() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wEvaluaciones/consulta/tutor/colegio",
          {
            //crossDomain: true,
            params: {
              idTutor: localStorage.userID,
              tokenString: localStorage.accessToken,
            },
          }
        );
        //this.colegios = res.data
        let codigosColegio = res.data.map((a) => a.idColegio);
        let nombresColegio = res.data.map((a) => a.nombreColegio);
        this.api_colegios = codigosColegio.map((value, i) => ({
          value,
          text: nombresColegio[i],
        }));
        //console.log(res)
        //console.log(this.api_colegios)
      } catch (e) {
        console.error(e);
      }
    },
    async getSecciones() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wEvaluaciones/consulta/tutor/seccion",
          {
            //crossDomain: true,
            params: {
              idColegio: this.selectColegio.value,
              idTutor: localStorage.userID,
              tokenString: localStorage.accessToken,
            },
          }
        );
        //this.secciones = res.data
        let codigosSeccion = res.data.map((a) => a.idSeccion);
        let nombresSeccion = res.data.map((a) => a.nombreSeccion);
        this.api_secciones = codigosSeccion.map((value, i) => ({
          value,
          text: nombresSeccion[i],
        }));
        //console.log(res)
        //console.log(this.api_secciones)
      } catch (e) {
        console.error(e);
      }
    },

    async getCitasEspecialista() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarCitas/consulta/citas",
          {
            //crossDomain: true,
            params: {
              idEspecialista: localStorage.userID,
            },
          }
        );
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_citas = res.data.map( cita => {
          cita.horaCita = cita.horaCita.split(":");
          cita.horaCita.pop();
          cita.horaCita = cita.horaCita.join(":");
          return cita;
        });
        console.log(res);
        //console.log(this.api_estudiantes)
      } catch (e) {
        console.error(e);
      }
    },

    async getCitasTutor() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarCitas/consulta/citas/tutor",
          {
            params: {
              idTutorAuuser: localStorage.userID,
              idSeccion: this.selectSeccion.value,
            },
          }
        );
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_citas = res.data.map( cita => {
          cita.horaCita = cita.horaCita.split(":");
          cita.horaCita.pop();
          cita.horaCita = cita.horaCita.join(":");
          return cita;
        });
        console.log(res);
        //console.log(this.api_estudiantes)
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
