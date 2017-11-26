<template>
  <div class="header-container">
    <div class="header-wrapper">
      <div class="logo-wrapper"></div>
      <div class="button-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue  from 'vue'
  import Component from 'vue-class-component'
  
  @Component({
  })
  export default class Header extends Vue {
    mounted() {
    }
  }
</script>

<style lang="scss">
  @import '../../style/variable.scss';
  .header-container {
    height: 80px;
    line-height: 80px;
    width: 100%;
    background: #fff;
  }

  .header-wrapper{
    height: 100%;
    width: 92%;
    margin: 0 auto;
    background: #fff;
    .logo-wrapper {
      height: 50px;
      width: 50px;
      background: #000;
      margin-top: 15px;
      float: left;
    }
    .button-wrapper {
      float: right;
      height: 80px;
      line-height: 80px;
    }
  }
</style>