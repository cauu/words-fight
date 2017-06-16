<template>
  <div>
    <Table
      v-bind:columns="columns"
      :data="books"
      >
    </Table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State } from 'vuex-class'

  @Component({
  })
  export default class BookList extends Vue {
    columns:Array<any> = [
      {
        title: '序号',
        key: 'id'
      },
      {
        title: '书名',
        key: 'title'
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render (row, columns, index) {
          return `
            <i-button 
              type="primary"
              size="small"
              @click="onShowLevel(${index})">
              查看
            </i-button>
          `
        }
      }
    ]

    @State(state => state.book.all) books

    onShowLevel (index) {
      /**@desc 
       * Go to level page of specific book
       * */
      this.$router.push(`/level/${this.books[index].id}`)
    }
  }
</script>

<style>
</style>