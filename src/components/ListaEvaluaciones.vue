<template>
  <v-container >
    <v-row><h4>Filtros</h4></v-row>
    <v-row>
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
    show-expand
    class="elevation-6"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Evaluaciones</v-toolbar-title>
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
    <!--template v-slot:item.actions="{ item }">
< open new tab api/estudiantes/id >
      <v-icon
      color = 'light-blue'
        @click="deleteItem(item)"
      >
      </v-icon>

         <v-spacer></v-spacer>
    
    </template-->
    <template #expanded-item="{headers,item}">
      <td :colspan="headers.length"
    style="padding:0;" >
    <v-list two-line>
      <v-row>
      <v-col>
       <v-list-item >
       
        <v-list-item-icon>
          <v-icon color="light-blue">mdi-account-tie</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
           <v-list-item-subtitle>Especialista</v-list-item-subtitle>
          <v-list-item-title>Alvin Pérez</v-list-item-title>
         
        </v-list-item-content>

      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item >
        <v-list-item-icon>
          <v-icon color="light-blue">mdi-calendar-month</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>Fecha de evaluación</v-list-item-subtitle>
          <v-list-item-title>{{item.fecha}}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
      <v-divider inset ></v-divider>
      <v-list-item >
        <v-list-item-icon>
          <v-icon color="light-blue">mdi-book-check</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>Tipo de evaluación</v-list-item-subtitle>
          <v-list-item-title>Prueba de Faraday</v-list-item-title>         
        </v-list-item-content>

      </v-list-item>
       <v-divider inset></v-divider> 
      </v-col>
      <v-col>
        <v-list-item >
        
        <v-list-item-icon>
          <v-icon color="light-blue">mdi-account-child</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-subtitle>Tutor</v-list-item-subtitle>
          <v-list-item-title>Gianmarco Chávez</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
      <v-list-item >
        <v-list-item-icon>
          <v-icon color="light-blue">mdi-calendar-month</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>Fecha de resultado</v-list-item-subtitle>
          <v-list-item-title>{{item.fechaR}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider> 

      <v-list-item >
        <v-list-item-icon>
          <v-icon color="light-blue">mdi-numeric</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>Puntaje</v-list-item-subtitle>
          <v-list-item-title>70/100</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider> 
      </v-col>
      </v-row>
      <v-row   style=" text-align: center;"><v-col>
        <v-list-item >

        <v-list-item-content>
          <v-list-item-subtitle>Diagnóstico</v-list-item-subtitle>
          <v-list-item-title>Depresión moderada</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-col></v-row>

      <v-row ><v-col>
        <v-list-item >

        <v-list-item-content class="justify-center">
          <v-btn color="indigo accent-1" >Crear Cita</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col></v-row>

    </v-list>   
      </td>
    </template>
 
  </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers:[
        {
          text: 'Fecha',
          align: 'center',
          value: 'fecha',
          width: '240px'
        },
        {
          text: 'Estudiante',
          align: 'center',
          value: 'name',
          width: '240px'
        },
        { text: 'Colegio', value: 'colegio', width: '240px', align: 'center', },
        { text: 'Seccion', value: 'seccion', width: '160px', align: 'center', },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
        { text: 'Estado', value: 'estado', width: '220px', align: 'center', /*justify: 'center',*/},
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
            codigo: 'E02',
            fecha: '24/08/2020',
            fechaR: '25/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            estado: 'Pendiente',
          },
          {
            codigo: 'E08',
            fecha: '22/08/2020',
            fechaR: '24/08/2020',
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            estado: 'Pendiente',
          },
          {
            codigo: 'E33',
            fecha: '19/08/2020',
            fechaR: '20/08/2020',
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            estado: 'Realizada',
          },
          {
            codigo: 'E56',
            fecha: '14/08/2020',
            fechaR: '15/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            estado: 'Pendiente',
          },
          {
            codigo: 'E45',
            fecha: '11/08/2020',
            fechaR: '13/08/2020',
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            estado: 'Pendiente',
          },
          {
            codigo: 'E99',
            fecha: '06/08/2020',
            fechaR: '10/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            estado: 'Realizada',
          },

        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
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
