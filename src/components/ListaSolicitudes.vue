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
        <v-toolbar-title>Lista de Solicitudes</v-toolbar-title>
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
        @click="deleteItem(item)"
      >
      </v-icon>
     <v-dialog v-model="dialog2" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange lighten-1"
          dark
          v-bind="attrs"
          v-on="on"
          height="30px"
          width ="200px"
        >
          Ver detalle
        </v-btn>
      </template>
      <v-card>
        <v-card-title  style="backgroundColor: #FFA726;">
          <span class="headline" style="color: white;">Solicitud de ayuda</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                  <v-col cols="12" sm="6"  >
                <v-text-field
                  value="24/08/20"
                  label="Fecha"
                  prepend-icon="mdi-calendar-month"
                  outlined
                  readonly=""
                  required
                ></v-text-field>
              </v-col>
                 <v-col cols="12" sm="6"  >
                <v-text-field
                  value="Alan Brito"
                  label="Estudiante"
                  prepend-icon="mdi-account"
                  outlined
                  readonly=""
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea
              v-model="title"
              label="Mensaje"
              outlined
              full-width
              readonly
              no-resize
            ></v-textarea>
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
      dialog2: false,
      headers: [
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
        { text: 'Seccion', value: 'seccion', width: '200px', align: 'center', },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
        { text: '', value: 'actions', sortable: false,width: '240px', align: 'center', justify: 'center',},
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
            fecha: '24/08/2020',
            name: 'Alan Brito',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            fecha: '22/08/2020',
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            edad: 17,
          },
          {
            fecha: '19/08/2020',
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            edad: 6.0,
          },
          {
            fecha: '14/08/2020',
            name: 'Alan Brito',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            fecha: '11/08/2020',
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            edad: 15,
          },
          {
            fecha: '06/08/2020',
            name: 'Alan Brito',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
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
