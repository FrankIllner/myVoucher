<template>
  <div id="app">
    <Header />
    <div class="wrapper">
    <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
};
</script>

