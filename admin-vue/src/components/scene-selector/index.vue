<template>
  <Select>
  </Select>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action } from 'vuex-class'

  @Component({
    props: {
      lid: String
    }
  })
  export default class SceneSelector extends Vue {
    lid: string

    @State(state => state.scene.all) scenes

    @Action('listAllScenes') listAllScenes

    created() {
      if(!this.scenes[this.lid]) {
        this.listAllScenes({ level: lid })
      }
    }
  }
</script>