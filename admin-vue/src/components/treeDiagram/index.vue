<template>
</template>

<style scoped>
</style>

<script>
  import Vue from 'vue'
  import d3 from 'd3'
  import Component from 'vue-class-component'
  import { State, Action } from 'vuex-class'

  @Component({
    props: {
      data: {}
    }
  })
  export default class TreeDiagram extends Vue {
    mounted() {
      const tree = d3.layout.tree()
        .size([width, height - 200])
    }
  }
</script>