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


<style lang="scss">
@import "./scss/colors";
@import "./scss/basic";
@import "./scss/layout";
@import "./scss/buttons";
@import "./scss/company";
  .bg-vue {
    background-color: rgb(52, 73, 94);
    color: white;
  }
  .bg-vue2 {
    background-color: rgb(65, 184, 131) !important;
    color: white;
  }
  .color-vue {
    color: rgb(52, 73, 94);
  }
  .color-vue2 {
    color: rgb(65, 184, 131);
  }
</style>

