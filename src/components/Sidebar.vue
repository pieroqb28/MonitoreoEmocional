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
        v-model="drawer"
        app
        clipped
        color = 'light-blue '
      >
        <v-list dense>
          <v-list-item>
     <v-card height="68 px">
    <v-navigation-drawer  
      permanent
      right
     
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://akns-images.eonline.com/eol_images/Entire_Site/2017411/rs_600x600-170511060426-600.gypsy-naomi-watts.ch.051117.jpg?fit=around|700:700&output-quality=90&crop=700:700;center,top">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Ariadne Tejada</v-list-item-title>
            <v-list-item-subtitle>Psicóloga </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>   
  </v-card>
        </v-list-item>
          
          <v-list-item
            v-for="item in items"
            :key="item.text"
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon color = 'white'>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content style="color: white;">
              <v-list-item-title color = 'indigo'>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        
        </v-list>
      </v-navigation-drawer>
  
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
         // { title: 'Asignar sección', icon: 'mdi-book-plus' },
        { title: 'Análisis', link: 'analisis', icon: 'mdi-align-vertical-bottom' },
        { title: 'Perfil', link: 'perfil', icon: 'mdi-account-box' },
        { title: 'Estudiantes', link: 'estudiantes', icon: 'mdi-account-multiple' },
        { title: 'Consulta de Evaluaciones', link: 'evaluaciones', icon: 'mdi-book-check' },
        { title: 'Consulta de Citas', link: 'citas', icon: 'mdi-book-account' },
        { title: 'Solicitudes de Ayuda', link: 'solicitudes', icon: 'mdi-handshake-outline' },
        //{ title: 'Resultados', link: 'estudiantes-id', icon: 'mdi-badge-account' }
        
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
