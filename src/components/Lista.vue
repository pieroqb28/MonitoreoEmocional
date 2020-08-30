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
        mdi-account-box
      </v-icon>

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
        { text: 'Estado', value: 'estado', width: '290px', align: 'center', },
        { text: 'Edad', value: 'edad',width: '290px', align: 'center', },
        { text: '', value: 'actions', sortable: false,width: '290px', align: 'center', },
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
            estado: 'Evaluaciones pendientes',
            edad: 17,
          },
          {
            name: 'Piero Quiroz',
            estado: 'Evaluaciones pendientes',
            edad: 17,
          },
          {
            name: 'Tessa Livia',
            estado: 'Disponible',
            edad: 6.0,
          },
          {
            name: 'Claudio Pizarro',
            estado: 'Evaluaciones pendientes',
            edad: 14,
          },
          {
            name: 'Donald Glover',
            estado: 'Disponible',
            edad: 15,
          },
          {
            name: 'Lilibeth Ortiz',
            estado: 'Disponible',
            edad: 8,
          },
          {
            name: 'Walter Cueva',
            estado: 'Evaluaciones pendientes',
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
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
