<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="10">
          <crumb-nav 
            currCode="question"
            currText="问题列表"
            />
        </Col>
        <Button @click="toCreate" style="float:right" type="primary">
          创建问题
        </Button>
        <Button style="float:right; margin-right: 5px" type="ghost">
          查看问题树
        </Button>
      </Row>
    </section>
    <section>
      <div class="paginate-table-wrapper">
        <Table
          :columns="columns"
          :data="questions"
          >
        </Table>
        <Page
          :current="pagination.pageNo"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @on-change="onPaginate"
          />
      </div>
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

    @State(state => state.question.pagination) pagination

    @Action('listQuestions') listQuestions

    mounted() {
      this.listQuestions({
        scene: this.sid,
        pageNo: 1,
        pageSize: 10
      })
    }

    onPaginate(pageNo) {
      this.listQuestions({
        scene: this.sid,
        pageNo,
        pageSize: this.pagination.pageSize
      })
    }

    toCreate() {
      this.$router.push(`/question/edit/${this.sid}`)
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