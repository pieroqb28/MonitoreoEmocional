<template>
  <v-app>
    <!--TopNav /-->
    <custom-component v-if="Logged()">   <Sidebar /></custom-component>
  
    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'app',
  components: {
    Sidebar
  },
  methods:{
     Logged() {
        if(this.$route.path == "/" || this.$route.path == "/registro" ) {
          return false
        } else {
          return true
        }
     }
  },
  data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
      }}
}
</script>
