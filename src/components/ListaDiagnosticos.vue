<template>
  <v-container >
      <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="scale-transition">

      <v-card>
        <v-toolbar dark color="light-blue">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Diagnóstico</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Volver</v-btn>
          </v-toolbar-items>
        </v-toolbar><v-container>
       <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-row>
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

    <v-col><v-row><v-col>
    <v-text-field
      v-model="DNI"
      :rules="DNIRules"
      label="Tutor"
      required
    ></v-text-field></v-col></v-row>
    </v-col>

  </v-row>

  <v-row>
    <v-col>
    <v-text-field
      v-model="celular"
      :rules="celularRules"
      label="Institución"
      readonly
      required
    ></v-text-field>
    </v-col>
    <v-col>
    <v-text-field
      v-model="correo"
      :rules="nameRules"
      label="Sección"
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
      label="Fecha Cita"
      readonly
      required
    ></v-text-field>
    </v-col>
    <v-col>
    <v-text-field
      v-model="correo"
      :rules="nameRules"
      label="Tipo Cita"
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
      label="Evaluación"
      readonly
      required
    ></v-text-field>
    </v-col>
    <v-col>
    <v-text-field
      v-model="correo"
      :rules="nameRules"
      label="Tipo Depresión"
      readonly
      required
    ></v-text-field>
    </v-col>
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
      label="Descripción del tutor"
      rows="3"
      no-resize
    ></v-textarea>
      </v-col></v-row>

     <v-row><v-col>
      <v-textarea
      v-model="descripcion"
      filled
      label="Diagnóstico"
      rows="5"
      no-resize
    ></v-textarea>
      </v-col></v-row>

    <v-row>
    <v-spacer></v-spacer>


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="dialog = false"
    >
      Guardar
    </v-btn>
    </v-row>
  </v-form></v-container>   
      </v-card>
    </v-dialog>
  </v-row>
    <v-row><h4>Filtros</h4></v-row>
    <!--v-row>
      <v-col cols="6">
        <v-combobox
          v-model="select"
          :items="coles"
          label="Institución educativa"        
        ></v-combobox>
      </v-col>
      <v-col cols="6">
        <v-combobox
          v-model="select2"
          :items="secciones"
          label="Sección"         
        ></v-combobox>
      </v-col>
    </v-row-->
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
                    <v-date-picker v-model="dateIni" @input="menuIni = false" locale="es" color="light-blue"></v-date-picker>
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
                    <v-date-picker v-model="dateFin" @input="menuFin = false" locale="es" color="light-blue"></v-date-picker>
                  </v-menu>  
      </v-col>
    </v-row>
    <v-row>
   <v-data-table  
    :headers="headers"
    :items="desserts"
    item-key="codigo" 
    :search="search"
    calculate-widths
    
    class="elevation-6"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Diagnosticos</v-toolbar-title>
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
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-plus-thick
      </v-icon>
    </template>
    <!--template #expanded-item="{headers,item}">
      <td :colspan="headers.length"
      style="padding:0;">
    <v-list two-line>
      <v-row>
      <v-col>
       <v-list-item >

        <v-list-item-content>
          <v-list-item-title>{{item.solicitud}}</v-list-item-title>        
        </v-list-item-content>

      </v-list-item>
      </v-col>
      </v-row>
      <v-row >
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">
          <v-btn color="indigo accent-1" >Crear Cita</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">
          <v-btn color="light-blue accent-1" >Crear Evaluación</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
      </v-row>

    </v-list>   
      </td>
    </template-->
  </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      name: '',
      dialog: false,
      headers: [
        {
          text: 'Fecha',
          align: 'center',
          value: 'fecha',
          width: '230px'
        },
        {
          text: 'Estudiante',
          align: 'center',
          value: 'name',
          width: '230px'
        },
        { text: 'Colegio', value: 'colegio', width: '230px', align: 'center', },
        { text: 'Seccion', value: 'seccion', width: '180px', align: 'center', },
        { text: 'Evaluacion', value: 'evaluacion', width: '230px', align: 'center', },
         { text: '', value: 'actions', sortable: false },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
       // { text: '', value: 'actions', sortable: false,width: '240px', align: 'center', justify: 'center',},
      ],
      dateIni: new Date().toISOString().substr(0, 10),
      dateFin: new Date().toISOString().substr(0, 10),
      menuIni: false,
      menuFin: false,
      search: '',
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        estado: 0,
        edad: 0,
      },
      defaultItem: {
        name: '',
        estado: 0,
        edad: 0,
      },
      //select: [''],
      //select2: [''],
      coles: [
        'I.E.E. José Olaya',
        'Colegio Villa María',
        'Colegio Alpamayo',
        'Liceo Naval Almirante Guise'
        ],
       secciones: [
        '5°-A sec.',
        '6°-B prim.',
         '2°-B prim.'
       ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            evaluacion:'Depresión moderada',
            solicitud: 'Ayudaaaaaaa 1',
            codigo: 'S03',
            fecha: '24/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            evaluacion:'Depresión moderada',
            solicitud: 'Ayudaaaaaaa 26',
            codigo: 'S08',
            fecha: '22/08/2020',
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            edad: 17,
          },
          {
            evaluacion:'Depresión severa',
            solicitud: 'Ayudaaaaaaa 165',
            codigo: 'S15',
            fecha: '19/08/2020',
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            edad: 6.0,
          },
          {
            evaluacion:'Depresión leve',
            solicitud: 'Ayudaaaaaaa 21',
            codigo: 'S33',
            fecha: '14/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            evaluacion:'Depresión moderada',
            solicitud: 'Ayudaaaaaaa 31',
            codigo: 'S47',
            fecha: '11/08/2020',
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            edad: 15,
          },
          {
            evaluacion:'Sin depresión',
            solicitud: 'Ayudaaaaaaa 19',
            codigo: 'S113',
            fecha: '06/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },

        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.name = item.name
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        this.desserts.splice(index, 1)
        this.desserts.push(item)
        var win = window.open('http://localhost:8080/#/estudiantes-id');
        win.focus();
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
