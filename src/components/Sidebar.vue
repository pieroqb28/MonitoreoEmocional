<template>
  <v-container>
      <span class="hidden-sm-and-up">
        
        <v-btn dark color="light-blue"
          @click.stop="drawer = !drawer"
        >
          Menú
        </v-btn>
      </span>
    <!--v-card
      height="85"
      class="overflow-hidden"
    >
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card-->
      <v-navigation-drawer
       color = 'light-blue '
        app
        class="hidden-xs-only"
      >
        <v-list dense>
          <v-list-item>
         <v-card height="68 px">

        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://akns-images.eonline.com/eol_images/Entire_Site/2017411/rs_600x600-170511060426-600.gypsy-naomi-watts.ch.051117.jpg?fit=around|700:700&output-quality=90&crop=700:700;center,top">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{nombre}}</v-list-item-title>
            <v-list-item-subtitle>{{rol}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> 

         </v-card>
          </v-list-item>
          <template v-for="item in items" >
            <v-row             
              v-if="item.heading"
              :key="item.heading"
              align="center"
            >
              <v-col cols="6">
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-col>
              <!--v-col
                cols="6"
                class="text-center"
              >
                <a
                  href="#!"
                  class="body-2 black--text"
                >EDIT</a>
              </v-col-->
            </v-row>
            <v-list-group
           
              v-else-if="item.children && (item.tipoRol===rol || item.tipoRol==='AMBOS')"
              :key="item.text"
              v-model="item.model"
              
              append-icon=""
            >
            <v-icon slot="prependIcon" color="white">{{item.model ? item.icon : item['icon-alt']}}</v-icon>
              <template v-slot:activator >
                <v-list-item-content >
                  <v-list-item-title style="color: white;">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                :to="child.link"
              >
                <v-list-item-action v-if="child.icon" style="margin-left: 1.1em;">
                  <v-icon color = 'white'>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title style="color: white;"> 
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else-if="(item.tipoRol===rol || item.tipoRol==='AMBOS')"
              :key="item.text"
              :to="item.link"
            >
              <v-list-item-action>
                <v-icon color = 'white'>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="color: white;">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item><v-spacer></v-spacer></v-list-item>
          <v-list-item><v-spacer></v-spacer></v-list-item>    
          <v-list-item><v-spacer></v-spacer></v-list-item>
          <v-list-item><v-spacer></v-spacer></v-list-item>    
          <v-list-item><v-spacer></v-spacer></v-list-item>              
            <v-list-item  @click="onClickLogout()">
              <v-list-item-action>
                <v-icon color = 'pink darken-1'>mdi-exit-to-app</v-icon>
              </v-list-item-action>
              <v-list-item-title style="color: #D81B60;">
               Cerrar sesión
              </v-list-item-title>
           </v-list-item>
        </v-list>
      </v-navigation-drawer>

   <v-navigation-drawer
        v-model="drawer"
        
        temporary
        right
         app
        color = 'light-blue '
      >
        <v-list dense>
          <v-list-item>
         <v-card height="68 px">

        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://akns-images.eonline.com/eol_images/Entire_Site/2017411/rs_600x600-170511060426-600.gypsy-naomi-watts.ch.051117.jpg?fit=around|700:700&output-quality=90&crop=700:700;center,top">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{nombre}}</v-list-item-title>
            <v-list-item-subtitle>{{rol}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> 

         </v-card>
          </v-list-item>
          <template v-for="item in items" >
            <v-row             
              v-if="item.heading"
              :key="item.heading"
              align="center"
            >
              <v-col cols="6">
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-col>
              <!--v-col
                cols="6"
                class="text-center"
              >
                <a
                  href="#!"
                  class="body-2 black--text"
                >EDIT</a>
              </v-col-->
            </v-row>
            <v-list-group
           
              v-else-if="item.children && (item.tipoRol===rol || item.tipoRol==='AMBOS')"
              :key="item.text"
              v-model="item.model"
              
              append-icon=""
            >
            <v-icon slot="prependIcon" color="white">{{item.model ? item.icon : item['icon-alt']}}</v-icon>
              <template v-slot:activator >
                <v-list-item-content >
                  <v-list-item-title style="color: white;">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                :to="child.link"
              >
                <v-list-item-action v-if="child.icon" style="margin-left: 1.1em;">
                  <v-icon color = 'white'>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title style="color: white;"> 
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else-if="(item.tipoRol===rol || item.tipoRol==='AMBOS')"
              :key="item.text"
              :to="item.link"
            >
              <v-list-item-action>
                <v-icon color = 'white'>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="color: white;">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item><v-spacer></v-spacer></v-list-item>
          <v-list-item><v-spacer></v-spacer></v-list-item>    
          <v-list-item><v-spacer></v-spacer></v-list-item>
          <v-list-item><v-spacer></v-spacer></v-list-item>    
          <v-list-item><v-spacer></v-spacer></v-list-item>              
            <v-list-item  @click="onClickLogout()">
              <v-list-item-action>
                <v-icon color = 'pink darken-1'>mdi-exit-to-app</v-icon>
              </v-list-item-action>
              <v-list-item-title style="color: #D81B60;">
               Cerrar sesión
              </v-list-item-title>
           </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    
    data () {
      return {
        dialog: false,
        drawer: false,
      items: [
      //{ icon: 'mdi-align-vertical-bottom', text: 'Análisis', tipoRol: 'AMBOS', link: 'analisis' },
      { icon: 'mdi-account-box', text: 'Perfil', tipoRol: 'AMBOS', link: 'perfil' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Pacientes',
        tipoRol: 'ESPECIALISTA',
        model: false,
        children: [
          { icon: 'mdi-account-multiple' , text: 'Consultar Pacientes', link:'pacientes' },
          { icon: 'mdi-account-search', text: 'Detalle Paciente' , link: 'paciente_detalle'},
          { icon: 'mdi-account-plus', text: 'Asignar Paciente' , link: 'paciente_asignar'},
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Estudiantes',
        tipoRol: 'TUTOR',
        model: false,
        children: [
          { icon: 'mdi-account-multiple' , text: 'Consultar Estudiantes', link:'estudiantes' },
          { icon: 'mdi-plus', text: 'Asignar a seccion' , link: 'asignar_seccion'},
          { icon: 'mdi-plus', text: 'Crear seccion', link: 'crear_seccion' },
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Evaluaciones ',
        tipoRol: 'AMBOS',
        model: false,
        children: [
        { text: 'Consulta de Evaluaciones', link: 'evaluaciones', icon: 'mdi-book-check' },
        { text: 'Crear Evaluación', link: 'crear_evaluacion', icon: 'mdi-plus'},
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Citas',
        tipoRol: 'AMBOS',
        model: false,
        children: [
        { text: 'Consulta de Citas', link: 'citas', icon: 'mdi-book-account' },
        { text: 'Crear Cita', link:'crear_cita', icon: 'mdi-plus' },
        ],
      },
      { icon: 'mdi-handshake-outline', text: 'Solicitudes de Ayuda', tipoRol: 'AMBOS', link: 'solicitudes' },
      { icon: 'mdi-code-not-equal', text: 'Diagnósticos', tipoRol: 'ESPECIALISTA', link: 'diagnosticos' },
      { icon: 'mdi-format-list-bulleted', text: 'Actividades', tipoRol: 'ESPECIALISTA', link: 'crear_actividad' },
      { icon: 'mdi-align-vertical-bottom', text: 'Reportes', tipoRol: 'ESPECIALISTA',  link: 'analisis'},
      {
        icon: 'mdi-calendar',
        text: 'Calendario de citas',
        tipoRol: 'ESPECIALISTA',
        link: "calendario_citas",
        model: false,
      },
      {
        icon: 'mdi-chart-bar',
        text: 'Monitoreo',
        tipoRol: 'ESPECIALISTA',
        link: "bi-diagram",
        model: false,
      },
    ],
        color:'indigo',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
        rol: localStorage.userRole,
        nombre: localStorage.userName,

      }
    },

    methods:{
      onClickLogout() {
        this.logout()
      },
      ...mapActions("auth", ["logout"]),
      },
  }
</script>
