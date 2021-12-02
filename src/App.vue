<template>
<div>
    <!-- MENU DE NAVEGACAO AQUI -->
    <h1>EAD PLATAFORMA!</h1>
  <p>
    <router-link to="/register">Register</router-link>
    <br>
    <br>
    <router-link to="/">Login</router-link>
  </p>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  watch: {
    $route: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(to, from) {
        document.title = to.meta.title;
      }
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
