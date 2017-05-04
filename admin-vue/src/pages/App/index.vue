<template>
  <div>
    <header-top></header-top>
    <div class="main-wrapper">
      <div class="nav-wrapper">
        <side-bar></side-bar>
      </div>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </div>
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
  .main-wrapper {
    height: 500px;
    width: 92%;
    background: black;
    margin: 30px auto 20px;
    .nav-wrapper {
      float: left;
      height: 100%;
      background: #fff;
    }
    .content-wrapper {
      float: left;
      background:red;
      height: 200px;
      width: 200px;
    }
  }
</style>