<template>
  <div id="App">
    hello, world!
  </div>
</template>

<script>
  import Vue from 'vue'
  // import Sketch from 'vue-color'

  // var defaultProps = {
  //   hex: '#194d33',
  //   hsl: {
  //     h: 150,
  //     s: 0.5,
  //     l: 0.2,
  //     a: 1
  //   },
  //   hsv: {
  //     h: 150,
  //     s: 0.66,
  //     v: 0.30,
  //     a: 1
  //   },
  //   rgba: {
  //     r: 25,
  //     g: 77,
  //     b: 51,
  //     a: 1
  //   },
  //   a: 1
  // }

  var myAppComponent = {
    name: 'App',
    data () {
      return {
        colors: defaultProps
      }
    },
    onChange (val) {
      this.colors = val
    },
    components: {
      // 'sketch-picker': Sketch
    }
  }

  var App = Vue.component('App', myAppComponent)
  export default App
</script>

<style lang="scss">
// @import '~bulma';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
