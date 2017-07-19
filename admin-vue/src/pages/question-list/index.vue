<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">书本</Breadcrumb-item>
            <Breadcrumb-item>关卡</Breadcrumb-item>
            <Breadcrumb-item>场景</Breadcrumb-item>
            <Breadcrumb-item>问题</Breadcrumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <route-link>
            <Button type="primary">
              创建问题
            </Button>
          </route-link>
        </Col>
      </Row>
    </section>
    <section>
      <Table
        :columns="columns"
        :data="questions"
        >
      </Table>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action, Mutation } from 'vuex-class'

  @Component({
    props: {
      sid: String,
      lid: String
    }
  })
  export default class QuestionList extends Vue {
    sid: string

    columns = [
      {
        title: '问题名',
        key: 'title'
      },
      {
        title: '问题文本',
        key: 'text'
      },
      {
        title: '类型',
        key: 'type'
      },
      {
        title: '操作',
        width: 150,
        align: 'center',
        key: 'operation',
        render(row, columns, index) {
          return `
            <i-button
              type="primary"
              size="small"
              >
              修改
            </i-button>
          `
        }
      }
    ]

    @State(state => state.question.list) questions

    @Action('listQuestions') listQuestions

    mounted() {
      this.listQuestions({
        scene: this.sid,
        pageNo: 1,
        pageSize: 10
      })
    }
  }
</script>

<style>
</style>