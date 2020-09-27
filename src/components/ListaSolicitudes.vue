<template>
  <v-container >
    <v-row><h4>Filtros</h4></v-row>
    <v-row>
      <v-col cols="6">
        <v-combobox       
          v-model="selectTipoSolicitud"
          :items="tipo_solicitudes"
          placeholder="-"
          label="Estado de solicitud"
          @change="getSolicitudes()"
        ></v-combobox>
      </v-col>
      <v-col cols="6">
        <!--v-combobox
          v-model="selectSeccion"
          :items="api_secciones"
          label="Sección"
          @change="getEstudiantes()"         
        ></v-combobox-->
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
    :items="api_solicitudes"
    item-key="idSolicitudAyuda" 
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
          <v-list-item-title>{{item.descripcion}}</v-list-item-title>        
        </v-list-item-content>

      </v-list-item>
      </v-col>
      </v-row>
      <v-row >
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">  
          <v-btn color="indigo accent-1" @click ="goToCrearCita(item.dniEstudiante)">Crear Cita</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">
          <v-btn color="light-blue accent-1" @click ="goToCrearEvaluacion(item.dniEstudiante)">Crear Evaluación</v-btn>
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
      selectTipoSolicitud:[],
      headers: [
        {
          text: 'Fecha',
          align: 'center',
          value: 'fecha',
          width: '240px'
        },
        {
          text: 'Nombres',
          align: 'center',
          value: 'primerNombre',
          width: '215px'
        },
        {
          text: 'Apellidos',
          align: 'center',
          value: 'segundoNombre',
          width: '215px'
        },
        { text: 'Colegio', value: 'colegio', width: '215px', align: 'center', },
        { text: 'Estado', value: 'contenido', width: '215px', align: 'center', },
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
       tipo_solicitudes:[
         {
           text: 'Pendiente',
           value: '1',
         },
         {
           text: 'Atendida',
           value: '2',
         },
       ],
        api_colegios:[],
        api_secciones:[],
        api_solicitudes:[],
    }),



    methods: {

      async getSolicitudes(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaSolicitudesAyuda/consulta/solicitudes/ayuda',{
            //crossDomain: true,
            params:{
            estadoSolicitud:this.selectTipoSolicitud.value,
            }
        })
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_solicitudes = res.data
        console.log(res)
        //console.log(this.api_estudiantes)
      } catch(e){
        console.error(e)
      }
      
    },
    goToCrearEvaluacion(pDNI){
      console.log(pDNI)
      localStorage.setItem("selectedEstudiante", pDNI)
      console.log(localStorage.getItem("selectedEstudiante"))
      this.$router.push('/crear_evaluacion')
      },
    goToCrearCita(pDNI){
      localStorage.setItem("selectedEstudiante", pDNI)
      console.log(localStorage.getItem("selectedEstudiante"))
      this.$router.push('/crear_cita')
      },

    },
  }
</script>
