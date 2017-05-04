<template>
  <div>
    <header-top></header-top>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  declare let require: any
  // import Header from '../../components/Header/index';
  var headerTop = require('components/Header').default
  var sideBar = require('components/SideBar').default

  export default {
    components: {
      headerTop,
      sideBar
    }
  }
</script>

<style lang="scss">
</style>