<template >
  <v-container>
   
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-row>
    <v-col>
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
    >
      Buscar
    </v-btn></v-row>
    </v-col>
    <v-col>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Nombre"
      readonly
      required
    ></v-text-field>
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
      v-model="familiar"
      :rules="nameRules"
      label="Familiar"
      readonly
      required
    ></v-text-field>
    </v-col>
  </v-row>
    <v-row>
    <v-col>
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
                    <v-date-picker v-model="date" @input="menuFecha = false" locale="es"  color="indigo"></v-date-picker>
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
    <v-row><v-col>
      <v-textarea
      filled
      label="Descripción"
      auto-grow
      rows="5"
    ></v-textarea>
      </v-col></v-row>
    <v-row>
    <v-spacer></v-spacer>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reiniciar 
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
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menuFecha: false,
      valid: true,
      name: 'Jorge Talca',
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
      celular:'986477328',
      celularRules: [
        //v => !!v || 'El DNI es obligatorio',
        //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      familiar:'John Doe',
      selectEspecialista: null,
      selectEspecialistaRules: [
        v => !!v || 'Debe seleccionar un especialista',
        //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      especialistas: [
        'Ariadne Tejada',
        'Daphne Zapata',
        'Robert Mendoza',
        'Alicia Romero',
      ],

      selectHora: null,
      selectHoraRules: [
        v => !!v || 'Debe seleccionar una hora para la cita',
        //v => /.+@.+\..+/.test(v) || 'E-mail muast be valid',
      ],
      horas: [
        '10:00',
        '10:30',
        '11:00',
        '17:30',
      ],

    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },

    },
  }
</script>
