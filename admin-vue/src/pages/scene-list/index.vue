<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">书本</Breadcrumb-item>
            <Breadcrumb-item href="/level/list">关卡</Breadcrumb-item>
            <Breadcrumb-item>场景</Breadcrumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <router-link to="">
            <Button type="primary">
              创建场景
            </Button>
          </router-link>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Table
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
  import { State, Action, Mutation } from 'vuex-class'

  @Component({
    props: {
      lid: String
    }
  })
  export default class SceneList extends Vue {
    lid: string
    
    columns = [
      {
        title: 'ID',
        key: '_id'
      },
      {
        title: '场景名称',
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
            </i-button>
            <i-button>
            </i-button>
          `
        }
      }
    ]

    @State(state => state.scene.list) scenes

    @Action('listScenes') listScenes

    created() {
      this.listScenes({
        level: this.lid,
        pageNo: 1,
        pageSize: 10
      })
    }
  }
</script>