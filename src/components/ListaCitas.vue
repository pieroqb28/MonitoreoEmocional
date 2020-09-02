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
        @click="deleteItem(item)"
      >
      </v-icon>

         <v-spacer></v-spacer>
    
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
      dialog: false,
      headers: [
        {
          text: 'Estudiante',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '290px'
        },
        { text: 'Colegio', value: 'colegio', width: '290px', align: 'center', },
        { text: 'Seccion', value: 'seccion', width: '290px', align: 'center', },
        { text: 'Estado', value: 'estado',width: '290px', align: 'center', },
        //{ text: '', value: 'actions', sortable: false,width: '440px', align: 'center', justify: 'center',},
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
            estado: 'Sin Citas',
          },
          {
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            estado: 'Citas pendientes',
          },
          {
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            estado: 'Citas pendientes',
          },
          {
            name: 'Claudio Pizarro',
            colegio: 'Colegio Alpamayo',
            seccion: '3C',
            estado: 'Sin citas',
          },
          {
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            estado: 'Citas pendientes',
          },
          {
            name: 'Lilibeth Ortiz',
            colegio: 'Colegio Villa María',
            seccion: '3B',
            estado: 'Sin citas',
          },
          {
            name: 'Walter Cueva',
            colegio: 'I.E.E. José Olaya',
            seccion: '6C',
            estado: 'Citas pendientes',
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
