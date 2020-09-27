<template>
<v-container>
   <v-row><h4>Filtros</h4></v-row>
    <v-row>
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
    </v-row>  

      <v-row justify="end">
      
  
    <v-btn dark color = 'indigo' @click ="goToCrearEvaluacion()" >Asignar evaluación</v-btn>
 
    </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>

    <v-row>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="api_estudiantes"
    :single-select="singleSelect"
    no-results-text = "Búsqueda sin coincidencias"
    no-data-text = "No hay estudiantes disponibles"
    item-key="idEstudiante"
    show-select
    class="elevation-6"
    :search="search"
    
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
    data :() => ({
      //return {
        selectColegio:[],
        selectSeccion:[],
        singleSelect: true,
        selected: [],
        search: '',

       headers: [
          { text: 'Nombres', value: 'nombreEstudiante', width: '260px', align: 'left', },
          { text: 'DNI', value: 'dniEstudiante', width: '260px', align: 'left', },
          { text: 'Apoderado', value: 'nombrePadre', width: '260px', align: 'left', },
          { text: 'Contacto Apoderado', value: 'celularPadre', width: '260px', align: 'left', },
          
       ], 
        api_colegios:[],
        api_secciones:[],
        api_estudiantes:[],

      //}
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
          //console.log(res)
          //console.log(this.api_colegios)
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
        //console.log(res)
        //console.log(this.api_secciones)
      } catch(e){
        console.error(e)
      }
    },
    async getEstudiantes(){
      try{
        const res = await axios.get('https://sistemadepresivotesisupc.azurewebsites.net/api/wEvaluaciones/consulta/listado/estudiantes',{
            //crossDomain: true,
            params:{
            idSeccion:this.selectSeccion.value,
            idTutor:localStorage.userID,
            tokenString:localStorage.accessToken,
            }
        })
        console.log(this.selectSeccion.value, localStorage.userID,localStorage.accessToken )
        //this.secciones = res.data
        //let codigosSeccion= res.data.map(a => a.idSeccion);
        //let nombresSeccion = res.data.map(a => a.nombreSeccion)
        //this.api_secciones = codigosSeccion.map((value,i) => ({value, text: nombresSeccion[i]}));
        this.api_estudiantes = res.data
        this.api_estudiantes.map( a => console.log(a.nombreEstudiante))
        //console.log(res)
        //console.log(this.api_estudiantes)
      } catch(e){
        console.error(e)
      }
    },
  goToCrearEvaluacion(){
    localStorage.setItem("selectedEstudiante", this.selected[0].dniEstudiante)
    console.log(localStorage.getItem("selectedEstudiante"))
    this.$router.push('/crear_evaluacion')
  },
  }
  }
</script>
<style scoped>

</style>