<template>
  <v-form ref="form" lazy-validation>
    <v-row>
      <v-col cols="10" class="dni-container">
        <v-combobox
          v-model="selectColegio"
          :items="api_colegios"
          label="Institución educativa"
          @change="getSecciones()"
        ></v-combobox>
      </v-col>
      <v-col cols="10" class="dni-container">
        <v-combobox v-model="selectSeccion" :items="api_secciones" label="Sección"></v-combobox>
      </v-col>
    </v-row>
    <v-col cols="10" class="dni-container">
      <v-row class="dni-input">
        <v-text-field
          v-model="dniValue"
          label="DNI"
          hint="Ingresa el DNI del estudiante"
          class="text"
          color="primary"
        ></v-text-field>
        <v-btn dark color="indigo" @click="consultarDni()">Consultar DNI</v-btn>
      </v-row>
    </v-col>
    <v-col cols="10" class="dni-container">
      <v-row>
        <v-text-field
          v-model="firstName"
          hint="Primer nombre"
          label="Primer nombre"
          class="mr-1"
          color="primary"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="secondName"
          hint="Primer nombre"
          label="Segundo Nombre"
          class="mr-1"
          color="primary"
          disabled
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="lastName"
          hint="Primer appelido"
          label="Primer appelido"
          class="mr-1"
          color="primary"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="lastName2"
          hint="Segundo apellido"
          label="Segundo apellido"
          class="mr-1"
          color="primary"
          disabled
        ></v-text-field>
      </v-row>
    </v-col>
    <v-col cols="10" class="dni-container">
      <v-row justify="end">
        <v-btn dark color="success" @click="asignarAlumno()">Asignar Alumno</v-btn>
      </v-row>
      <v-alert
        :value="alert"
        transition="slide-y-transition"
        color="primary"
        dismissible
        dark
      >Asignado con exito</v-alert>
    </v-col>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getColegios();
  },
  data: () => ({
    //return {
    alert: false,
    dniValue: "",
    estudiante: [],
    firstName: "",
    secondName: "",
    lastName: "",
    lastName2: "",
    selectSeccion: [],
    selectColegio: [],
    singleSelect: true,
    selected: [],
    search: "",
    isDisabled: true,
    headers: [
      {
        text: "Código",
        value: "idEstudiante",
        width: "245 px",
        align: "center",
        sortable: false,
      },
      { text: "Nombres", value: "nombres", width: "260px", align: "center" },
      {
        text: "Apellidos",
        value: "apellidos",
        width: "260px",
        align: "center",
      },
      { text: "Colegio", value: "colegio", width: "260px", align: "center" },
      { text: "Sección", value: "idSeccion", width: "245px", align: "center" },
    ],
    api_colegios: [],
    api_secciones: [],
    api_estudiantes: [],

    //}
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
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
        if (this.$route.query.idColegio !== undefined) {
          this.selectColegio = this.api_colegios.find((colegio) => {
            return colegio.value.toString() === this.$route.query.idColegio;
          });
          this.getSecciones();
        }
        
        //console.log(res)
        //console.log(this.api_colegios)
      } catch (e) {
        this.id;
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
    async consultarDni() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEstudianteSeccion/asignar/consulta/DNI",
          {
            //crossDomain: true,
            params: {
              dni: this.dniValue,
            },
          }
        );
        if (res.data) {
          this.estudiante = res.data[0];
          this.firstName = this.estudiante.nombre;
          this.secondName = this.estudiante.segundoNombre;
          this.lastName = this.estudiante.apellidoPaterno;
          this.lastName2 = this.estudiante.apellidoMaterno;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async asignarAlumno() {
      try {
        const res = await axios.post(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEstudianteSeccion/asignar/estudianteE/seccion",
          {
            //crossDomain: true,
            idSeccion: this.selectSeccion.value,
            idTutor: parseInt(localStorage.userID),
            idEstudiante: this.estudiante.idEstudiante,
            idColegio: this.selectColegio.value,
          }
        );
        if (res.data) {
          this.alert = true;
          this.$refs.form.reset();
          console.log(res.data);
        }
      } catch (e) {
        this.alert = true;
        this.$refs.form.reset();
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
.dni-container {
  margin: 0 auto;
}
.dni-input {
  align-items: center;
  justify-content: space-between;
}
.dni-input .text {
  padding-right: 50px;
}
.sm-text {
  width: 49%;
}
</style>