<template>
  <v-app>
    <!--TopNav /-->
    <Sidebar />
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
