<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <crumb-nav
            currCode="scene"
            currText="场景列表"
            />
        </Col>
        <Col span="2">
          <router-link :to="`/scene/edit/${lid}`">
            <Button type="primary">
              创建场景
            </Button>
          </router-link>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <div class="paginate-table-wrapper">
        <Table
          :columns="columns"
          :data="scenes"
          />
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

<style>
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action, Mutation } from 'vuex-class'

  import CrumbNav from '../../components/crumb-nav'

  @Component({
    props: {
      lid: String
    },
    components: {
      CrumbNav
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
              @click="toQuestionList('${row._id}')"
              >
              查看问题
            </i-button>
            <i-button
              type="ghost"
              size="small"
              @click="toEdit('${row._id}')"
              >
              修改
            </i-button>
          `
        }
      }
    ]

    @State(state => state.scene.list) scenes

    @State(state => state.scene.pagination) pagination

    @Action('listScenes') listScenes

    mounted() {
      this.listScenes({
        level: this.lid,
        pageNo: 1,
        pageSize: 10
      })
    }

    onPaginate(pageNo) {
      this.listScenes({
        level: this.lid,
        pageNo,
        pageSize: this.pagination.pageSize
      })
    }

    toEdit(sid) {
      this.$router.push(`/scene/edit/${this.lid}/${sid}`)
    }

    toQuestionList(sid) {
      this.$router.push(`/question/list/${sid}`)
    }

    toLevelList() {
      this.$router.back()
    }
  }
</script>