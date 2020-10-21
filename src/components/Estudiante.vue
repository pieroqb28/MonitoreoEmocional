<template >
  <v-container>

     <v-row justify="center">
    <v-col cols="12" sm="15">
      <v-card >
        

        <v-list>
      <v-row>
        <v-col>
           <v-list-item >
            <v-list-item-action>
              <h4> Nombre </h4>   
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Alan</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
          <v-divider inset></v-divider>

          <v-list-item >
            <v-list-item-action>
              <h4>Colegio </h4>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Colegio Alpamayo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item >
            <v-list-item-action>
              <h4> Edad  </h4>   
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>16</v-list-item-title>
            </v-list-item-content>
           
          </v-list-item>



        </v-col>
        
        <v-col>
            <v-list-item >
            <v-list-item-action>
              <h4>Apellido </h4>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Brito</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
                    <v-divider inset></v-divider>


          <v-list-item >
            <v-list-item-action>
              <h4>Sección </h4>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>4° B</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
              <v-divider inset></v-divider>
          <v-list-item >
            <v-list-item-action>
              <h4>Teléfono</h4>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>993351370</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
        </v-list>


      </v-card>
    </v-col>
  </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>

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


     <v-dialog v-model="dialog2" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal darken-1"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Crear actividad
        </v-btn>
      </template>
      <v-card>
        <v-card-title  style="backgroundColor: #00897B;">
          <span class="headline" style="color: white;">Crear actividad</span>
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
 
    </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <v-row>  <v-col><v-spacer></v-spacer></v-col> </v-row>
    <v-row>
    <v-tabs
      v-model="tab"
      background-color="light-blue lighten-3"

      dark
      active-class="example"
      :centered="true"
      :grow="true"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        v-for="i in tabs"
        :key="i"
        :href="`#tab-${i}`"
      >
       {{ i }}
        
      </v-tab>

      <v-tab-item
        v-for="i in tabs"
        :key="i"
        :value="'tab-' + i"
      >
        <!--v-card
          flat
          tile
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card-->
          <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >

  
  </v-data-table>
      </v-tab-item>
    </v-tabs>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
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
          text: 'Prueba',
          align: 'start',
          value: 'name',
        },
        { text: 'Fecha de asignación', value: 'fecha' },
        { text: 'Estado', value: 'estado' },
      ],
        desserts: [
          {
            name: 'Prueba de Faraday',
            fecha: '22/08/20',
            estado: 'Pendiente',
          },
          {
            name: 'Prueba de Collins',
            fecha: '22/08/20',
            estado: 'Completada',
          },
        ],
    }
  },

  methods: {
    removeFromCart() {
    }
  }
}
</script>

<style scoped>
.example {
  background-color:#039BE5;
  
}
</style>
