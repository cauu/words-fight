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
      width: 17%;
      border-right: 1px solid #d7dde4;
      .ivu-menu-item {
        border-right: 0!important;
      }
      .ivu-menu-light:after {
        background: transparent;
      }
    }
    .content-wrapper {
      background: #fff;
      width: 83%;
      padding: 20px 25px;
    }
  }
</style>

<template>
  <div>
    <header-top></header-top>
    <div class="main-wrapper">
      <div class="nav-wrapper">
        <side-bar></side-bar>
      </div>
      <div class="content-wrapper">
        <router-view keep-alive></router-view>
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
