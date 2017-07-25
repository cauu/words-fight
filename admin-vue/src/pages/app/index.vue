<style lang="scss">
  .main-wrapper {
    display: flex;
    width: 92%;
    margin: 30px auto 20px;
    justify-content: space-between;
    .nav-wrapper {
      height: auto;
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

  .text-header {
    font-size: 16px;
    &.highlight {
      color: #39f;
    }
  }
</style>

<template>
  <div>
    <particle />
    <header-top>
      <span class="text-header">你好, </span>
      <span class="text-header highlight" style="margin-right: 10px">{{ username }}</span>
      <a @click="logout">
        <Icon size="18" type="log-out">登出</Icon>
      </a>
    </header-top>
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
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import headerTop from 'components/Header'
  import sideBar from 'components/SideBar'
  import particle from 'components/particle'

  @Component({
    components: {
      headerTop,
      sideBar,
      particle
    }
  })
  export default class App extends Vue {
    username: string = localStorage.getItem('username')

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')

      window.location.href = '/login'
    }
  }
</script>
