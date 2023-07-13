<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view />
    <!--
    <pre>
      {{ $route }}
    </pre>
    -->
  </div>
</template>

<script>
  //import * from './assets/scss/app.scss';
  require('./assets/scss/app.scss');

  export default {
    name: 'App'
  };
</script>

<!--<style lang="scss">
  @import "./assets/scss/app.scss";
</style>-->
