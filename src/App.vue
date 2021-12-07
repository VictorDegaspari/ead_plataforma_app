<template>
<div>
  <Nav v-if="ignoreDomains()"/>
  <router-view></router-view>
</div>
</template>

<script>
import Nav from '@/components/Navigation.vue';
export default {
  name: 'App',
  components: {
    Nav
  },
  watch: {
    $route: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(to, from) {
        document.title = to.meta.title;
      }
    },
  },
  methods: {
    ignoreDomains() {
      return this.$route.path === '/' ||  this.$route.path === '/register' ? false : true
    },
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap');
* {
    font-family: 'Inter', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #e6e6e6;
  margin-top: 60px;
  width: 100%;
  margin: 0;
  min-height: 100vh;
  padding: 50px 0 0 0;
}
</style>
