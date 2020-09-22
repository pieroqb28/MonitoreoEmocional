<template >
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation class="centered">
      <v-col sm="6">
        <v-combobox
          v-model="selectColegio"
          :items="api_colegios"
          placeholder="-"
          label="Institución educativa"
          @change="getSecciones()"
        ></v-combobox>
      </v-col>
      <v-col sm="6">
        <v-row>
          <v-col>
            <v-text-field v-model="name" :rules="nameRules" label="Nombre de la sección" required></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <!--v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
      ></v-checkbox-->
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-4" @click="reset">Reiniciar</v-btn>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Crear</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import axios from "axios";

export default {
  mounted() {
    this.getColegios();
  },
  data: () => ({
    menuFecha: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "El nombre del colegio es obligatorio",
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    selectColegio: undefined,
    colegios: [],
    secciones: [],
    api_colegios: [],
    api_secciones: [],
    api_estudiantes: [],
  }),

  methods: {
    async validate() {
      console.log(this.selectColegio);
      if (this.$refs.form.validate()) {
        const res = await axios.put(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wGestionColegioSeccion/Registrar/Seccion/Colegio",
          {
            idTutor: localStorage.userID,
            idColegio: this.selectColegio.value,
            codigo_colegio: this.selectColegio.codigoColegio,
            grado: this.name,
            nivelPrioSec: "",
          }
        );
        if (res.data === "Se registro correctamente") {
          console.log("go");
          this.$router.push(`asignar_seccion?idColegio=${this.selectColegio.value}`);
        } else {
          console.log(res);
        }
      }
    },
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
        // let codigosColegio = res.data.map((a) => a.idColegio);
        // let nombresColegio = res.data.map((a) => a.nombreColegio);

        this.api_colegios = res.data.map((value) => ({
          value: value.idColegio,
          text: value.nombreColegio,
          codigoColegio: value.codigoColegio,
        }));
        this.colegios = res.data;
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
        this.api_secciones = res.data.map((value) => ({
          value: value.idSeccion,
          text: value.nombreSeccion,
        }));
      } catch (e) {
        console.error(e);
      }
    },
    async createSection() {
      try {
        axios
          .post(
            "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEvaluacion/asignar/evaluacion",
            {
              //crossDomain: true,
              idEstudiante: this.idEstudiante,
              descripcion: this.descripcion,
              idObjEvaluacion: this.selectEvaluacion.value,
              idTutor: localStorage.userID,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data === "Se registro correctamente") {
              console.log("go");
              window.location.href = `asignar_seccion?idColegio=${this.selectColegio.value}`;
            }
            console.log(res);
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
