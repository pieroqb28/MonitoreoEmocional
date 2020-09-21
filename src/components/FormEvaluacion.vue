<template >
  <v-container>
   
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-row>
    <v-col><v-row><v-col>
    <v-text-field
      v-model="DNI"
      :counter="8"
      :rules="DNIRules"
      label="DNI"
      required
    ></v-text-field><v-row class="justify-center">
       <v-btn
      :disabled="!valid"
      color="light-blue accent-1"
      class="mr-4"
      @click="getDatosEstudiante()"
    >
      Buscar
    </v-btn></v-row></v-col></v-row>
    </v-col>
    <v-col>
      <v-row><v-col>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Nombres"
      readonly
      required
    ></v-text-field></v-col><v-col>
      <v-text-field
      v-model="apellido"
      :rules="nameRules"
      label="Apellidos"
      readonly
      required
    ></v-text-field></v-col>
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
      v-model="selectEvaluacion "
      :items="api_evaluaciones"
      :rules="selectEvaluacionRules"
      label="Evaluación"
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
    <v-row><v-col>
      <v-textarea
      v-model="descripcion"
      filled
      label="Descripción"
      rows="5"
      no-resize
    ></v-textarea>
      </v-col></v-row>
    <v-row>
    <v-spacer></v-spacer>
    <v-btn
      color="error"
      class="mr-4"
      @click="postEvaluacion()"
    >
      Crear Evaluación 
    </v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validar
    </v-btn>
    </v-row>
  </v-form>
  
  </v-container>
</template>

<script>
import axios from "axios"

  export default {
    mounted(){
      this.DNI = localStorage.getItem("selectedEstudiante")
      this.getDatosEstudiante()
      this.getEvaluaciones()
      //this.name = localStorage.getItem("selectedEstudiante").dniEstudiante
    },
    data: () => ({
      valid: true,
      name: '',
      apellido: '',
      nameRules: [
        //v => !!v || 'Name is required',
        //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      DNI: '',
      DNIRules: [
        v => !!v || 'El DNI es obligatorio',
        v => (v && v.length == 8) || 'El DNI debe contener 8 dígitos',
        //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      celular:'',
      celularRules: [
        //v => !!v || 'El DNI es obligatorio',
        //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      correo:'',
      selectEvaluacion: null,
      selectEvaluacionRules: [
        v => !!v || 'Debe seleccionar una evaluación',
        //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      api_evaluaciones:[],
      idEstudiante:'',
      descripcion:'',
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },

     async getDatosEstudiante(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEvaluacion/asignar/consulta/DNI',{
            //crossDomain: true,
            params:{
              dni:this.DNI,
            }
        })
        console.log(res)
        this.name = (res.data[0].b.primerNombre).concat(" ").concat(res.data[0].b.segundoNombre)
        this.apellido = (res.data[0].b.apellidoPaterno).concat(" ").concat(res.data[0].b.apellidoMaterno)
        this.celular = (res.data[0].b.celularEstudiante)
        this.correo = (res.data[0].b.correoEstudiante)
        this.idEstudiante = (res.data[0].b.idAuUser)

      } catch(e){
        console.error(e)
      }
    },
    
     async getEvaluaciones(){
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
    },
    async postEvaluacion() {
      try {
        const res = await axios.post(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wAsignarEvaluacion/asignar/evaluacion",
          {
            //crossDomain: true,
            idEstudiante: this.idEstudiante,
            descripcion: this.descripcion, 
            idObjEvaluacion: this.selectEvaluacion.value,
            idTutor:localStorage.userID,
          }
        );
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    },

    },
  }
</script>
