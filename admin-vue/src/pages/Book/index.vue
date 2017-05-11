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
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      const columns:any = [
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

      return {
        columns
      }
    },
    computed: mapState({
      books: (state: any) => state.book.all
    }),
    methods: {
      onShowLevel (index) {
        /**@desc 
         * Go to level page of specific book
         * */
        this.$router.push(`/level/${this.books[index].id}`)
      }
    }
  }
</script>

<style>
</style>