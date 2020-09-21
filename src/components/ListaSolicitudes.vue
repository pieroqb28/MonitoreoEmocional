<template>
  <v-container >
    <v-row><h4>Filtros</h4></v-row>
    <!--v-row>
      <v-col cols="6">
        <v-combobox       
          v-model="selectColegio"
          :items="api_colegios"
          placeholder="-"
          label="Institución educativa"
          @change="getSecciones()"
        ></v-combobox>
      </v-col>
      <v-col cols="6">
        <v-combobox
          v-model="selectSeccion"
          :items="api_secciones"
          label="Sección"
          @change="getEstudiantes()"         
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
    show-expand
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

    <template #expanded-item="{headers,item}">
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
          <v-btn color="indigo accent-1" to="/crear_cita">Crear Cita</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">
          <v-btn color="light-blue accent-1" to="/crear_evaluacion">Crear Evaluación</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
      </v-row>

    </v-list>   
      </td>
    </template>
  </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
  export default {
    mounted(){
      this.getColegios()
    },
    data: () => ({
      selectColegio:[],
      selectSeccion:[],
      dialog2: false,
      headers: [
        {
          text: 'Fecha',
          align: 'center',
          value: 'fecha',
          width: '260px'
        },
        {
          text: 'Estudiante',
          align: 'center',
          value: 'name',
          width: '260px'
        },
        { text: 'Colegio', value: 'colegio', width: '260px', align: 'center', },
        { text: 'Seccion', value: 'seccion', width: '240px', align: 'center', },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
       // { text: '', value: 'actions', sortable: false,width: '240px', align: 'center', justify: 'center',},
      ],
      dateIni: new Date().toISOString().substr(0, 10),
      dateFin: new Date().toISOString().substr(0, 10),
      menuIni: false,
      menuFin: false,
      search: '',
      desserts: [],

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
        api_colegios:[],
        api_secciones:[],
        api_solicitudes:[],
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            solicitud: 'Ayudaaaaaaa 1',
            codigo: 'S03',
            fecha: '24/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            solicitud: 'Ayudaaaaaaa 26',
            codigo: 'S08',
            fecha: '22/08/2020',
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            edad: 17,
          },
          {
            solicitud: 'Ayudaaaaaaa 165',
            codigo: 'S15',
            fecha: '19/08/2020',
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            edad: 6.0,
          },
          {
            solicitud: 'Ayudaaaaaaa 21',
            codigo: 'S33',
            fecha: '14/08/2020',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            solicitud: 'Ayudaaaaaaa 31',
            codigo: 'S47',
            fecha: '11/08/2020',
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            edad: 15,
          },
          {
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

       async getColegios(){
        try{
          const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wEvaluaciones/consulta/tutor/colegio',{
              //crossDomain: true,
              params:{
              idTutor:localStorage.userID,
              tokenString:localStorage.accessToken,
              }
          })
          //this.colegios = res.data
          let codigosColegio = res.data.map(a => a.idColegio);
          let nombresColegio = res.data.map(a => a.nombreColegio)
          this.api_colegios = codigosColegio.map((value,i) => ({value, text: nombresColegio[i]}));
          console.log(res)
          console.log(this.api_colegios)
        } catch(e){
          console.error(e)
        }
      },
      async getSecciones(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wEvaluaciones/consulta/tutor/seccion',{
            //crossDomain: true,
            params:{
            idColegio:this.selectColegio.value,
            idTutor:localStorage.userID,
            tokenString:localStorage.accessToken,
            }
        })
        //this.secciones = res.data
        let codigosSeccion= res.data.map(a => a.idSeccion);
        let nombresSeccion = res.data.map(a => a.nombreSeccion)
        this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        console.log(res)
        console.log(this.api_secciones)
      } catch(e){
        console.error(e)
      }
      },

    },
  }
</script>
