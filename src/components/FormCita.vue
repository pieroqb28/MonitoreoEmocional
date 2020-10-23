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
              ></v-text-field
              ><v-row class="justify-center">
                <v-btn
                  :disabled="!valid"
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
        <v-col><v-spacer></v-spacer></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="selectHora"
            :items="horas"
            :rules="selectHoraRules"
            label="Hora"
            @input="filterEspecialistaByHora"
            required
          ></v-select>
        </v-col>
        <v-col><v-spacer></v-spacer></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-combobox
            v-model="selectEspecialista"
            :items="especialistas"
            :rules="selectEspecialistaRules"
            label="Especialista"
            required
          ></v-combobox>
        </v-col>
        <v-col><v-spacer></v-spacer></v-col>
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
            no-resize
            rows="5"
          ></v-textarea> </v-col
      ></v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-4" @click="reset"> Reiniciar </v-btn>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Crear cita
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { sendNotification } from "../utils/notificationUtil";

export default {
  mounted() {
    this.DNI = localStorage.getItem("selectedEstudiante");
    if (this.DNI !== "") {
      this.getDatosEstudiante();
    }
    this.getDatosEstudiante();
    this.getDatosEspecialistas();
    //this.getEvaluaciones()
    //this.name = localStorage.getItem("selectedEstudiante").dniEstudiante
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menuFecha: false,
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
    familiar: "",
    nombreCita: "",
    selectEspecialista: null,
    selectEspecialistaRules: [
      (v) => !!v || "Debe seleccionar un especialista",
      //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    api_especialistas: [],
    especialistas: [],
    selectHora: null,
    selectHoraRules: [
      (v) => !!v || "Debe seleccionar una hora para la cita",
      //v => /.+@.+\..+/.test(v) || 'E-mail muast be valid',
    ],
    horas: [],
    idEstudiante: "",
    descripcion: "",
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        let idEvaluacion = 0;
        if (this.$route.query.idEvaluacion) {
          idEvaluacion = this.$route.query.idEvaluacion;
        }
        let fecha = new Date(this.date);
        const params = {
          idEstudiante: this.idEstudiante,
          idEspecialista: this.selectEspecialista.value,
          idEvaluacion: idEvaluacion,
          idTutor: parseInt(localStorage.userID),
          nombre: this.nombreCita,
          descripcion: this.descripcion,
          fecha: fecha.toISOString(),
          hora: this.selectHora,
        };
        try {
          const res = await axios
            .post(
              "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarCitas/asignar/citas",
              params
            )
            if( res.status == "200" ) {
              sendNotification( 'appointment_created', this.idEstudiante )
            }
          // sendAppointmentMsg();
        } catch (e) {
          console.error(e);
        }
      }
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
        if (res.data[0]) {
          this.name = res.data[0].b.primerNombre
            .concat(" ")
            .concat(res.data[0].b.segundoNombre);
          this.apellido = res.data[0].b.apellidoPaterno
            .concat(" ")
            .concat(res.data[0].b.apellidoMaterno);
          this.celular = res.data[0].b.celularEstudiante;
          this.correo = res.data[0].b.correoEstudiante;
          this.idEstudiante = res.data[0].b.idAuUser;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getDatosEspecialistas() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarCitas/consultar/especialista"
        );
        this.api_especialistas = res.data.ar;
        // this.horas = res.data.ar.map( x => x.horaInicio );
        res.data.ar.map((x) => {
          this.getHorasByEspecialista(x.horaInicio, x.horaFin);
          this.setEspecialistas(x);
        });
      } catch (e) {
        console.error(e);
      }
    },
    setEspecialistas(x) {
      if (!this.especialistas.includes(x.nombre)) {
        this.especialistas.push({
          value: x.idEspecialista,
          text: x.nombre,
          horaInicio: x.horaInicio,
          horaFin: x.horaFin,
        });
      }
    },
    getHorasByEspecialista(horaInicio, horaFin) {
      const _horaInicio = parseInt(horaInicio.split(":")[0]);
      const _horaFin = parseInt(horaFin.split(":")[0]);
      let _currentHora = _horaInicio;
      while (_currentHora <= _horaFin) {
        if (!this.horas.includes(`${_currentHora}:00`)) {
          this.horas.push(`${_currentHora}:00`);
        }
        _currentHora = _currentHora + 1;
      }
    },
    filterEspecialistaByHora(selectedHora) {
      this.especialistas = [];
      this.selecthora = selectedHora;
      this.api_especialistas.map((x) => {
        const _horaInicio = x.horaInicio.split(":")[0];
        const _horaFin = x.horaFin.split(":")[0];
        const _selectedHora = selectedHora.split(":")[0];
        if (_selectedHora >= _horaInicio && _selectedHora <= _horaFin) {
          this.especialistas.push({
            value: x.idEspecialista,
            text: x.nombre,
            horaInicio: x.horaInicio,
            horaFin: x.horaFin,
          });
        }
      });
    },
    filterHoraByEspecialista(selectEspecialista) {
      this.horas = [];
      this.getHorasByEspecialista(
        selectEspecialista.horaInicio,
        selectEspecialista.horaFin
      );
    },
    /*async getEvaluaciones(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEvaluacion/asignar/consulta/obj/evaluaciones')
        let codigosObjEvaluacion= res.data.map(a => a.idObjEvaluacion);
        let nombresObjEvaluacion = res.data.map(a => a.nombreObjEvaluacion)
        this.api_evaluaciones = codigosObjEvaluacion.map((value,i) => ({value, text: nombresObjEvaluacion[i]}));
        //console.log(res)
        //console.log(this.api_evaluaciones)
      } catch(e){
        console.error(e)
      }
    },*/
  },
};
</script>
