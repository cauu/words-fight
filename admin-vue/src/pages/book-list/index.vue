<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item>书本列表</Breadcrumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <Button @click="toCreate" type="primary">
            创建书本
          </Button>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <div class="paginate-table-wrapper">
        <Table
          :columns="columns"
          :data="books"
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

<style scoped>
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action } from 'vuex-class'


  @Component
  export default class BookList extends Vue {
    columns:Array<any> = [
      {
        title: 'ID',
        key: '_id'
      },
      {
        title: '书名',
        key: 'title'
      },
      {
        title: '操作',
        key: 'operation',
        width: 150,
        align: 'center',
        render: (row, columns, index) => {
          return `
            <i-button 
              type="primary"
              size="small"
              @click="toLevelList(${index})">
              查看关卡
            </i-button>
            <i-button
              type="ghost"
              size="small"
              @click="toEdit(${index})"
              >
              修改
            </i-button>
          `
        }
      }
    ]

    @State(state => state.book.list) books

    @State(state => state.book.pagination) pagination

    @Action('listBooks') listBooks

    created() {
      this.listBooks({
        pageSize: 10,
        pageNo: 1
      })
    }

    onPaginate(pageNo) {
      this.listBooks({
        pageSize: this.pagination.pageSize,
        pageNo: pageNo
      })
    }

    toCreate(): void {
      this.$router.push(`/book/edit`)
    }

    toEdit(index): void {
      this.$router.push(`/book/edit/${this.books[index]._id}`)
    }

    toLevelList (index): void {
      this.$router.push(`/level/list/${this.books[index]._id}`)
    }
  }
</script>
