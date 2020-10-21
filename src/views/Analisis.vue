<template>
<v-container>
  <div>

    <Header />
    <Dashboard />
    <!--Footer /-->
  </div>
</v-container>
</template>

<script>
import Header from '@/components/Header.vue'
import Dashboard from '@/components/Dashboard.vue'
//import Footer from '@/components/Footer.vue'

export default {
  components: {

    Header,
    Dashboard,
    //Footer
  }
}
</script>
