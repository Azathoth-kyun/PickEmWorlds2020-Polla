<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  name: "App",
  components: {
  },
};
</script>

<style>
html{
  background-image: url('~@/assets/images/background_polla.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
