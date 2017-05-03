<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  declare let require: any
  // import Header from '../../components/Header/index';
  var Header = require('../../components/Header/index').default

  export default {}
</script>

<style lang="scss">
  @import '../../style/style.scss';
</style>