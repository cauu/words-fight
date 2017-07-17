<template>
  <Select  :on-change="this.onSelect" v-model="scenes">
    <Option
      v-for="item in scenes[this.lid]"
      :value="1"
      :key="item._id">
      {{ item.title }}
    </Option>
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

    mounted() {
      if(!this.scenes[this.lid]) {
        this.listAllScenes({ level: this.lid })
      }
    }

    onSelect(value) {
      console.log(value);
    }
  }
</script>