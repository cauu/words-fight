<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item>书本</Breadcrumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <Button @click="navTo('/book/edit')" type="primary">
            创建书本
          </Button>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Table
        v-bind:columns="columns"
        :data="books"
        >
      </Table>
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
        render (row, columns, index) {
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
              @click="navTo('/book/edit/${row.id}')"
              >
              修改
            </i-button>
          `
        }
      }
    ]

    @State(state => state.book.all) books

    @Action('listBooks') listBooks

    created() {
      this.listBooks()
    }

    navTo (url): void {
      this.$router.push(url);
    }

    toLevelList (index): void {
      /**@desc 
       * Go to level page of specific book
       * */
      this.$router.push(`/level/list/${this.books[index].id}`)
    }
  }
</script>
