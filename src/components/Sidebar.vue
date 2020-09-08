<template>
  <v-container>
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
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-item>
         <v-card height="68 px">

        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://akns-images.eonline.com/eol_images/Entire_Site/2017411/rs_600x600-170511060426-600.gypsy-naomi-watts.ch.051117.jpg?fit=around|700:700&output-quality=90&crop=700:700;center,top">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Ariadne Tejada</v-list-item-title>
            <v-list-item-subtitle>Psicóloga </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> 

         </v-card>
          </v-list-item>
          <template v-for="item in items">
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
              <v-col
                cols="6"
                class="text-center"
              >
                <a
                  href="#!"
                  class="body-2 black--text"
                >EDIT</a>
              </v-col>
            </v-row>
            <v-list-group
              v-else-if="item.children"
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
              v-else
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
        </v-list>
      </v-navigation-drawer>
  
  </v-container>
</template>

<script>
  export default {
    
    data () {
      return {
         dialog: false,
        drawer: null,
        //drawer: true,
        items2: [
         // { title: 'Asignar sección', icon: 'mdi-book-plus' },
        //{ title: 'Análisis', link: 'analisis', icon: 'mdi-align-vertical-bottom' },
        //{ title: 'Perfil', link: 'perfil', icon: 'mdi-account-box' },
        //{ title: 'Estudiantes', link: 'estudiantes', icon: 'mdi-account-multiple' },
        //{ title: 'Consulta de Evaluaciones', link: 'evaluaciones', icon: 'mdi-book-check' },
        //{ title: 'Consulta de Citas', link: 'citas', icon: 'mdi-book-account' },
        //{ title: 'Solicitudes de Ayuda', link: 'solicitudes', icon: 'mdi-handshake-outline' },
        //{ title: 'Resultados', link: 'estudiantes-id', icon: 'mdi-badge-account' }  
        
        ],
      items: [
      { icon: 'mdi-align-vertical-bottom', text: 'Análisis', link: 'analisis' },
      { icon: 'mdi-account-box', text: 'Perfil', link: 'perfil' },

      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Datos de Estudiantes',
        model: false,
        children: [
          { icon: 'mdi-account-multiple' , text: 'Lista de Estudiantes', link:'estudiantes' },
          { icon: 'mdi-plus', text: 'Asignar a seccion' },
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Control de Estudiantes',
        model: false,
        children: [
        { text: 'Consulta de Evaluaciones', link: 'evaluaciones', icon: 'mdi-book-check' },
        { text: 'Consulta de Citas', link: 'citas', icon: 'mdi-book-account' },
        ],
      },
      { icon: 'mdi-handshake-outline', text: 'Solicitudes de Ayuda', link: 'solicitudes' },
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

      }
    },

  }
</script>
