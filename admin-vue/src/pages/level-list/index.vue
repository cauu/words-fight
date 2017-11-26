<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <crumb-nav
            currCode="level"
            currText="关卡列表"
            />
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
      <div class="paginate-table-wrapper">
        <Table
          :data="levels"
          :columns="columns"
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
  import { State, Action } from 'vuex-class'

  import CrumbNav from '../../components/crumb-nav'

  @Component({
    props: {
      bid: String
    },
    components: {
      CrumbNav
    }
  })
  export default class LevelList extends Vue {
    bid: string

    columns = [
      {
        title: 'ID',
        key: '_id'
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
              @click="toSceneList('${row._id}')"
              >
              查看场景
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

    @State(state => state.level.list) levels

    @State(state => state.level.pagination) pagination

    @Action('listLevels') listLevels

    mounted() {
      this.listLevels({
        book: this.bid,
        pageNo: 1,
        pageSize: 10
      })
    }

    onPaginate(pageNo) {
      this.listLevels({
        book: this.bid,
        pageNo,
        pageSize: this.pagination.pageSize
      })
    }

    toEdit(lid) {
      this.$router.push(`/level/edit/${this.bid}/${lid}`)
    }

    toSceneList(lid) {
      this.$router.push(`/scene/list/${lid}`)
    }

    toBookList() {
      this.$router.back()
    }
  }
</script>