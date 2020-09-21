<template>
  <v-container >
    <v-row><h4>Filtros</h4></v-row>
    <v-row v-if="rol==='TUTOR'">
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
    :items="api_citas"
    item-key="idCita"
    no-results-text = "Búsqueda sin coincidencias"
    no-data-text = "No hay citas disponibles"
    :search="search"
    calculate-widths
    class="elevation-6"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Citas</v-toolbar-title>
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

  </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"

  export default {
    mounted(){
      this.getCitas()
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Fecha',
          align: 'center',
          value: 'fechaFin',
          width: '230px'
        },
        {
          text: 'Nombres',
          align: 'center',
          value: 'primerNombre',
          width: '230px'
        },
        {
          text: 'Apellidos',
          align: 'center',
          value: 'apellidoPaterno',
          width: '230px'
        },
        { text: 'Colegio', value: 'colegio', width: '230px', align: 'center', },
        { text: 'Tipo Cita', value: 'nombre', width: '230px', align: 'center', },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
        //{ text: '', value: 'actions', sortable: false,width: '240px', align: 'center', justify: 'center',},
      ],
      dateIni: new Date().toISOString().substr(0, 10),
      dateFin: new Date().toISOString().substr(0, 10),
      menuIni: false,
      menuFin: false,
      search: '',


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
       api_citas: [],
       rol: localStorage.userRole,
    }),



    methods: {
    async getCitas(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaCitas/consulta/citas',{
            //crossDomain: true,
            params:{
            idEspecialista:localStorage.userID,
            }
        })
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_citas = res.data
        console.log(res.data)
        //console.log(this.api_estudiantes)
      } catch(e){
        console.error(e)
      }
    },
    },
  }
</script>
