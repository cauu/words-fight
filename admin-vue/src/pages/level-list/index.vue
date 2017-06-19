<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">书本</Breadcrumb-item>
            <Breadcrumb-item>关卡</Breadcrumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <router-link :to="`/level/edit/${bid}`">
            <Button type="primary">
              创建关卡
            </Button>
          </router-link>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Table
        :data="levels"
        :columns="columns"
        />
    </section>
  </div>
</template>

<style>
</style>

<script>
  import Vue from 'vue'  
  import Component from 'vue-class-component'
  import { State } from 'vuex-class'

  @Component({
    props: {
      bid: String
    }
  })
  export default class LevelList extends Vue {
    bid: string

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
        width: 150,
        align: 'center',
        key: 'operation',
        render (row, columns, index) {
          return `
            <i-button
              type="primary"
              size="small"
              >
              查看场景
            </i-button>
            <i-button
              type="ghost"
              size="small"
              @click="toEdit(${row.id})"
              >
              修改
            </i-button>
          `
        }
      }
    ]

    @State(state => state.level.all) levels

    toEdit(levelId) {
      console.log(this);
      this.$router.push(`/level/edit/${this.bid}/${levelId}`)
    }
  }
</script>