<template>
<v-container>
  <div>
      <Sidebar />
    <Header />
    <Dashboard />
    <Footer />
  </div>
</v-container>
</template>

<script>
import Header from '@/components/Header.vue'
import Dashboard from '@/components/Dashboard.vue'
import Footer from '@/components/Footer.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Sidebar,
    Header,
    Dashboard,
    Footer
  }
}
</script>
