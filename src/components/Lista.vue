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
   <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    calculate-widths
    class="elevation-6"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Estudiantes</v-toolbar-title>
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
<!-- open new tab api/estudiantes/id -->
      <v-icon
      color = 'light-blue'
        @click="editItem(item)"
        
      > 
      </v-icon>

         <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo darken-1"
          dark
          v-bind="attrs"
          v-on="on"
          height="30px"
          algin = "center"
        >
          Asignar Evaluación
        </v-btn>
      </template>
      <v-card>
        <v-card-title style="backgroundColor: #3949AB;">
          <span class="headline" style="color: white;" >Asignar evaluación</span>
        </v-card-title>
        <v-card-text>
          <v-tabs
      v-model="tab2"
      background-color="light-blue lighten-3"
      active-class="example"
      width="30px"
      dark
      :centered="true"
      :fixed-tabs="true"
      
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        v-for="i in tabs2"
        :key="i"
        :href="`#tab2-${i}`"
      >
       {{ i }}
        
      </v-tab>

      <v-tab-item
        v-for="i in tabs2"
        :key="i"
        :value="'tab2-' + i"
      >
        <v-card
          flat
          tile
        >
           <v-img
      src="https://usercontent2.hubstatic.com/8821109_f496.jpg"
      height="400px"
      dark
    ></v-img>

        </v-card>

      </v-tab-item>
    </v-tabs>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Asignar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  

     <v-dialog v-model="dialog2" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal darken-1"
          dark
          v-bind="attrs"
          v-on="on"
          height="30px"
          width ="200px"
        >
          Crear cita
        </v-btn>
      </template>
      <v-card>
        <v-card-title  style="backgroundColor: #00897B;">
          <span class="headline" style="color: white;">Crear cita</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                 <v-col cols="12" sm="6"  >
                <v-select
                  :items="['Ariadne Tejada', 'Robert Zambrano', 'John Doe', 'Hanna Bloom']"
                  label="Psicólogo"
                  prepend-icon="mdi-account"
                  required
                ></v-select>
              </v-col>
      <v-col>  <v-spacer></v-spacer></v-col>
              <v-col cols="6">
                  <v-menu
                    v-model="menu2"
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
                        prepend-icon="mdi-calendar-month"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false" locale="es" color="teal darken-1"></v-date-picker>
                  </v-menu>        
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['11:00', '12:00', '18:00', '19:00']"
                  label="Hora"
                  prepend-icon="mdi-clock-outline"
                  required
                ></v-select>
              </v-col>
        
            </v-row>
          </v-container>
          <!--small>* Campo obligatorio</small-->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" text @click="dialog2 = false">Cerrar</v-btn>
          <v-btn color="green darken-1" text @click="dialog2 = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
 <v-spacer></v-spacer>
<v-row><v-spacer><h5 style="color: #FFFFFF;">.</h5></v-spacer></v-row>
    </template>
   
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: false,
        centered: false,
        grow: false,
        vertical: false,
        prevIcon: false,
        nextIcon: false,
        right: false,
        tabs: ['Historial de evaluaciones','Historial de citas'],
        tabs2: ['Prueba de Faraday','Prueba de Collins','Prueba de Jules'],
        dialog: false,
        dialog2: false,
        notifications: false,
        sound: true,
        widgets: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
      headers: [
        {
          text: 'Estudiante',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '240px'
        },
        { text: 'Colegio', value: 'colegio', width: '240px', align: 'center', },
        { text: 'Seccion', value: 'seccion', width: '240px', align: 'center', },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
        { text: '', value: 'actions', sortable: false,width: '440px', align: 'center', justify: 'center',},
      ],
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
      select: [''],
      select2: [''],
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
            name: 'Alan Brito',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            edad: 17,
          },
          {
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            edad: 6.0,
          },
          {
            name: 'Claudio Pizarro',
            colegio: 'Colegio Alpamayo',
            seccion: '3C',
            edad: 14,
          },
          {
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            edad: 15,
          },
          {
            name: 'Lilibeth Ortiz',
            colegio: 'Colegio Villa María',
            seccion: '3B',
            edad: 8,
          },
          {
            name: 'Walter Cueva',
            colegio: 'I.E.E. José Olaya',
            seccion: '6C',
            edad: 11,
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

<style scoped>
.example {
  background-color:#039BE5;
  
}
</style>