<template>
  <section class="content-box-wrapper">
    <span class="title">
      {{ title }}
    </span>
    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
  .content-box-wrapper {
    padding: 20px 0px;
    border: 1px solid #e9e9e9;
    position: relative;
    .ivu-form-item {
      margin-bottom: 0;
    }
    .title {
      position: absolute;
      padding: 0 5px;
      top: -11px;
      left: 30px;
      font-size: 16px;
      color: #657180;
      background: white;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {
    State,
    Action,
    Mutation
  } from 'vuex-class'

  @Component({
    props: {
      title: String,
      icon: String
    }
  })
  export default class ContentBox extends Vue {
    title: string
    icon: string
  }
</script>