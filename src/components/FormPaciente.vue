<template >
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col
          ><v-row
            ><v-col>
              <v-text-field
                v-model="DNI"
                :counter="8"
                :rules="DNIRules"
                label="DNI"
                required
                maxlength="8"
              ></v-text-field
              ><v-row class="justify-center">
                <v-btn
                  color="light-blue accent-1"
                  class="mr-4"
                  @click="getDatosEstudiante()"
                >
                  Buscar
                </v-btn></v-row
              ></v-col
            ></v-row
          >
        </v-col>
        <v-col>
          <v-row
            ><v-col>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nombres"
                readonly
                required
              ></v-text-field></v-col
            ><v-col>
              <v-text-field
                v-model="apellido"
                :rules="nameRules"
                label="Apellidos"
                readonly
                required
              ></v-text-field
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="celular"
            :rules="celularRules"
            label="Celular"
            readonly
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="correo"
            :rules="nameRules"
            label="Correo"
            readonly
            required
          ></v-text-field>
        </v-col>
      </v-row>

      

      <v-row>
        <v-spacer></v-spacer>

        <v-btn :disabled="!valid" color="error" class="mr-4" @click="reset">
          Limpiar
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="asignarPaciente()"
        >
          Asignar Paciente  
        </v-btn>
      </v-row>
    </v-form>
    <v-dialog v-model="postDialog" max-width="370">
      <v-card>
        <v-card-title class="headline">{{ this.textDialog }}</v-card-title>

        <!--v-card-text>
          La evaluación se ha registrado correctamente.
        </v-card-text-->

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="postDialog = false">
            Entendido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    /*this.DNI = localStorage.getItem("selectedEstudiante");
    this.idSolicitudAyuda = localStorage.getItem("selectedSolicitud");
    console.log(localStorage.getItem("selectedSolicitud"));
    if (localStorage.getItem("selectedSolicitud") == null)
      this.idSolicitudAyuda = 0;*/
    //console.log(localStorage.getItem("selectedEstudiante"))
    //this.getDatosEstudiante();
    //this.name = localStorage.getItem("selectedEstudiante").dniEstudiante
  },
  data: () => ({
    postDialog: false,
    textDialog: "",
    valid: true,
    name: "",
    apellido: "",
    nameRules: [
      //v => !!v || 'Name is required',
      //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    DNI: "",
    DNIRules: [
      (v) => !!v || "El DNI es obligatorio",
      (v) => (v && v.length == 8) || "El DNI debe contener 8 dígitos",
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    celular: "",
    celularRules: [
      //v => !!v || 'El DNI es obligatorio',
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    correo: "",
    selectEvaluacion: null,
    selectEvaluacionRules: [
      (v) => !!v || "Debe seleccionar una evaluación",
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    api_evaluaciones: [],
    idEstudiante: "",
    descripcion: "",
    idSolicitudAyuda: "",
  }),

  methods: {
    async getDatosEstudiante() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEvaluacion/asignar/consulta/DNI",
          {
            //crossDomain: true,
            params: {
              dni: this.DNI,
            },
          }
        );
        console.log(res)
        this.name = res.data[0].b.primerNombre
          .concat(" ")
          .concat(res.data[0].b.segundoNombre);
        this.apellido = res.data[0].b.apellidoPaterno
          .concat(" ")
          .concat(res.data[0].b.apellidoMaterno);
        this.celular = res.data[0].b.celularEstudiante;
        this.correo = res.data[0].b.correoEstudiante;
        this.idEstudiante = res.data[0].b.idAuUser;
      } catch (e) {
        console.error(e);
      }
    },

    async asignarPaciente() {
      try {
        const res = await axios.post(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAgregarPacienteEspecialista/asignar/paciente/especialista", null,{params:
          {
            //crossDomain: true,
            idEstudiante: parseInt(this.idEstudiante),
            idEspecialista: parseInt(localStorage.userID),
          }}
        );
        console.log(res);
        if (res.data === "No se asigno al paciente.") {
          this.textDialog = "No se pudo asignar al paciente.";
          //localStorage.removeItem("selectedSolicitud");
          //localStorage.removeItem("selectedEstudiante");
        } else this.textDialog = "El paciente ha sido asignado correctamente.";
        this.postDialog = true;
      } catch (e) {
        console.error(e);
        this.textDialog = "Ha ocurrido un problema, intente nuevamente";
        this.postDialog = true;
      }
    },
   reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
