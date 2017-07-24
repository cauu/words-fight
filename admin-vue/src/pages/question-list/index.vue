<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <crumb-nav 
            currCode="question"
            currText="问题列表"
            />
        </Col>
        <Col span="2">
          <router-link :to="`/question/edit/${sid}`">
            <Button type="primary">
              创建问题
            </Button>
          </router-link>
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

  import CrumbNav from '../../components/crumb-nav'

  @Component({
    props: {
      sid: String,
      lid: String
    },
    components: {
      CrumbNav
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
              @click="toEdit('${row._id}')"
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

    toEdit(qid) {
      this.$router.push(`/question/edit/${this.sid}/${qid}`)
    }

    toSceneList() {
      this.$router.back()
    }
  }
</script>

<style>
</style>