<template>
<v-container>
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

      <v-row justify="end">
      
       <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo darken-1"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Asignar evaluación
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
 
    </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>

    <v-row>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="estudiantes"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-6"
  >

  </v-data-table>
   </v-row>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        tabs2: ['Prueba de Faraday','Prueba de Collins','Prueba de Jules'],
        dialog: false,
        dialog2: false,
        singleSelect: true,
        selected: [],
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
        headers: [
          { text: 'Código', value: 'codigo', width: '240px', align: 'center', sortable: false, },
          {
            text: 'Estudiante',
            align: 'center',
            sortable: false,
            value: 'name',
            width: '295px'
          },
          { text: 'Colegio', value: 'colegio', width: '295px', align: 'center', },
          { text: 'Seccion', value: 'seccion', width: '260px', align: 'center', },
        // { text: 'Edad', value: 'edad',width: '180px', align: 'center', },
          //{ text: '', value: 'actions', sortable: false,width: '440px', align: 'center', justify: 'center',},
        ],     
       estudiantes : [
          {
            codigo: 'E44',
            name: 'Gianmarco Chávez',
            colegio: 'Newton School',
            seccion: '4B',
            edad: 17,
          },
          {
            codigo: 'E46',
            name: 'Piero Quiroz',
             colegio: 'Newton School',
            seccion: '5B',
            edad: 17,
          },
          {
            codigo: 'E41',
            name: 'Tessa Livia',
            colegio: 'Colegio Villa María',
            seccion: '1A',
            edad: 6.0,
          },
          {
            codigo: 'E63',
            name: 'Claudio Tasayco',
            colegio: 'Colegio Alpamayo',
            seccion: '3C',
            edad: 14,
          },
          {
            codigo: 'E14',
            name: 'Donald Glover',
            colegio: 'Liceo Naval Almirante Guise',
            seccion: '4C',
            edad: 15,
          },
          {
            codigo: 'E158',
            name: 'Lilibeth Ortiz',
            colegio: 'Colegio Villa María',
            seccion: '3B',
            edad: 8,
          },
          {
            codigo: 'E424',
            name: 'Walter Cueva',
            colegio: 'I.E.E. José Olaya',
            seccion: '6C',
            edad: 11,
          },

        ]
      }
    },
  }
</script>
<style scoped>

</style>