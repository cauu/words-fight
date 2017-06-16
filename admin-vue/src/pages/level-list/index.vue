<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book">书本</Breadcrumb-item>
            <Breadcrumb-item>关卡</Breadcrumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <Button type="primary">
            创建关卡
          </Button>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Table
        v-bind:columns="columns"
        >
      </Table>
    </section>
  </div>
</template>

<style>
</style>

<script>
  import Vue from 'vue'  
  import Component from 'vue-class-component'
  import { State } from 'vuex-class'

  @Component
  export default class LevelList extends Vue {
    columns = [
      {
        title: '序号',
        key: 'id'
      },
      {
        title: '关卡名',
        key: 'title'
      },
      {
        title: '操作',
        key: 'operation'
      }
    ]
  }
</script>