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
  import headerTop from 'components/Header'
  import sideBar from 'components/SideBar'

  export default {
    components: {
      headerTop,
      sideBar
    }
  }
</script>

<style lang="scss">
  .main-wrapper {
    display: flex;
    height: 500px;
    width: 92%;
    background: black;
    margin: 30px auto 20px;
    justify-content: space-between;
    .nav-wrapper {
      height: 100%;
      background: #fff;
      width: 18%;
    }
    .content-wrapper {
      background:red;
      width: 82%;
    }
  }
</style>