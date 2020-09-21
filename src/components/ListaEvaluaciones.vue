<template>
  <v-container >
    <v-row><h4>Filtros</h4></v-row>
    <v-row v-if="rol==='TUTOR'">
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
          @change="getEvaluacionesTutor()"          
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
    :items="api_evaluaciones"
    item-key="idEvaluacion" 
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
          <v-list-item-title>{{item.fecha}}</v-list-item-title>
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
          <v-btn color="indigo accent-1" href="http://localhost:8080/#/crear_cita">Crear Cita</v-btn>
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
import axios from "axios"
  export default {
     mounted(){
       if (this.rol==='TUTOR')
       {
          this.getColegios()
       }
      if (this.rol==='ESPECIALISTA')
       {
          this.getEvaluacionesEspecialista()
       }
    },
    data: () => ({
      selectColegio:[],
      selectSeccion:[],
      headers:[
        {
          text: 'Fecha',
          align: 'center',
          value: 'fecha',
          width: '240px'
        },
       {
          text: 'Nombres',
          align: 'center',
          value: 'nombreEstudiante',
          width: '240px'
        },
        {
          text: 'Apellidos',
          align: 'center',
          value: 'apellidoEstudiante',
          width: '240px'
        },
        //{ text: 'Colegio', value: 'colegio', width: '240px', align: 'center', },
        { text: 'Seccion', value: 'nombreSeccion', width: '160px', align: 'center', },
       // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
        { text: 'Estado', value: 'estadoEvaluacion', width: '220px', align: 'center', /*justify: 'center',*/},
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
        api_colegios:[],
        api_secciones:[],
        api_evaluaciones:[],
        rol: localStorage.userRole,
    }),

     methods:{
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
    async getEvaluacionesEspecialista(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaEvaluaciones/consulta/evaluaciones/especialista',{
            //crossDomain: true,
            params:{
            idEspecialista:localStorage.userID,
            tokenString:localStorage.accessToken,
            }
        })
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_evaluaciones = res.data
        console.log(res)
        //console.log(this.api_estudiantes)
      } catch(e){
        console.error(e)
      }
    },

    async getEvaluacionesTutor(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaEvaluaciones/consulta/evaluaciones/tutor',{
            //crossDomain: true,
            params:{
            idSeccion:this.selectSeccion.value,
            idTutor:localStorage.userID,
            tokenString:localStorage.accessToken,
            }
        })
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_evaluaciones = res.data
        console.log(res)
        //console.log(this.api_estudiantes)
      } catch(e){
        console.error(e)
      }
    },
  goToCrearEvaluacion(){
     localStorage.setItem("selectedEstudiante", this.selected[0].dniEstudiante)
     console.log(this.selected[0])
  },

  }
  }
</script>
