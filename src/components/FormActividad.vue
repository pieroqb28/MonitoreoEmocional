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
        <v-col>
          <v-combobox
            v-model="selectTipoActividad"
            :items="api_TipoActividad"
            :rules="selectTipoActividadRules"
            label="Tipo de actividad"
            required
          ></v-combobox>
        </v-col>
        <v-col>
          <v-text-field
            v-model="nombreActividad"
            :rules="nameRules"
            label="Nombre de actividad"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!--v-text-field
            v-model="nombreCita"
            label="Nombre de cita"
          ></v-text-field-->
          <v-menu
            v-model="menuFecha"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="190px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menuFecha = false"
              locale="es"
              color="indigo"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <!--v-col><v-spacer></v-spacer></v-col-->
        <v-col>
          <v-row>
            <!--v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nombres"
            readonly
            required
          ></v-text-field-->
            <v-menu
              ref="menuHI"
              v-model="menuHoraInicio"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeInicio"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeInicio"
                  label="Hora Inicio"
                  prepend-icon="mdi-clock-time-four-outline"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuHoraInicio"
                ampm-in-title
                format="ampm"
                scrollable
                v-model="timeInicio"
                full-width
                @click:minute="$refs.menuHI.save(timeInicio)"
              ></v-time-picker>
            </v-menu>
            <!--v-text-field
            v-model="apellido"
            :rules="nameRules"
            label="Apellidos"
            readonly
            required
          ></v-text-field-->
            <v-menu
              ref="menuHF"
              v-model="menuHoraFin"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeFin"
              transition="scale-transition"
              offset-y
              max-width="280px"
              min-width="280px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeFin"
                  label="Hora Fin"
                  prepend-icon="mdi-clock-time-four-outline"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuHoraFin"
                ampm-in-title
                format="ampm"
                scrollable
                v-model="timeFin"
                full-width
                @click:minute="$refs.menuHF.save(timeFin)"
              ></v-time-picker>
            </v-menu>
          </v-row>
        </v-col>
      </v-row>

      <!--v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox-->
      <v-row
        ><v-col>
          <v-textarea
            v-model="descripcion"
            filled
            label="Descripción"
            rows="5"
            no-resize
          ></v-textarea> </v-col
      ></v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          color="error"
          class="mr-4"
          @click="reset"
        >
          Limpiar
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="postActividad()"
        >
          Crear Evaluación
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
    this.DNI = localStorage.getItem("selectedEstudiante");
    //console.log(localStorage.getItem("selectedEstudiante"))
    this.getDatosEstudiante();
    this.getTipoActividades();
    //this.name = localStorage.getItem("selectedEstudiante").dniEstudiante
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menuFecha: false,
    timeInicio: null,
    menuHoraInicio: false,
    timeFin: null,
    menuHoraFin: false,
    postDialog: false,
    textDialog: "",
    valid: true,
    nombreActivdad: "",
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
    selectTipoActividad: null,
    selectTipoActividadRules: [
      (v) => !!v || "Debe seleccionar una evaluación",
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    selectDuracion: null,
    selectDuracionRules: [
      (v) => !!v || "Debe seleccionar una duración",
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    api_TipoActividad: [],
    api_Duraciones: ["1 día", "2 días", "3 días"],
    idEstudiante: "",
    descripcion: "",
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
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
        //console.log(res)
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

    async getTipoActividades() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarActividades/consulta/tipos/actividades"
        );
        let codigosTipoActividad = res.data.map((a) => a.codigo);
        let nombresTipoActividad = res.data.map((a) => a.contenido);
        this.api_TipoActividad = codigosTipoActividad.map((value, i) => ({
          value,
          text: nombresTipoActividad[i],
        }));
        console.log(res);
        //console.log(this.api_evaluaciones)
      } catch (e) {
        console.error(e);
      }
    },
    async postActividad() {
      try {
        const res = await axios.post(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarActividades/asignar/actividades",
          {
            //crossDomain: true,
            Nombre: this.nombreActivdad,
            FechaInicio: this.date,
            horaInicio: this.timeInicio,
            horaFin: this.timeFin,
            Descripcion: this.descripcion,
            TipoActividad: this.selectTipoActividad.value,
            IdEstudiante: this.idEstudiante,
            idEspecialista: localStorage.userID,
          }
        );
        console.log(res);
        if (res.status === 200) {
          this.textDialog = "La actividad ha sido creada correctamente";
        } else this.textDialog = "Ha ocurrido un problema, intente nuevamente";
        this.postDialog = true;
      } catch (e) {
        console.error(e);
        this.textDialog = "Ha ocurrido un problema, intente nuevamente";
        this.postDialog = true;
      }
    },
  },
};
</script>
