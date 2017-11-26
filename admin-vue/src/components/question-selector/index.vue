<template>
  <Select @on-change="onSelect" :value="value" placeholder="目标问题">
    <Option
      v-for="item in questions[sid]"
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
      sid: String,
      onChange: Function,
      value: String
    }
  })
  export default class QuestionSelector extends Vue {
    sid: string

    value: string

    onChange: Function

    @State(state => state.question.all) questions

    @Action('listAllQuestions') listAllQuestions

    mounted() {
      if(!this.questions[this.sid]) {
        this.listAllQuestions({ scene: this.sid })
      }
    }

    onSelect(value) {
      this.onChange(value)
    }
  }
</script>