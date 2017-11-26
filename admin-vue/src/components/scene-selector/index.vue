<template>
  <Select @on-change="onSelect" :value="value">
    <Option
      v-for="item in scenes[lid]"
      :value="item._id"
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
      lid: String,
      onChange: Function,
      value: String
    }
  })
  export default class SceneSelector extends Vue {
    lid: string

    value: string

    onChange: Function

    @State(state => state.scene.all) scenes

    @Action('listAllScenes') listAllScenes

    created() {
      if(!this.scenes[this.lid]) {
        this.listAllScenes({ level: this.lid })
      }
    }

    onSelect(value) {
      console.log(value)
      this.onChange(value)
    }
  }
</script>