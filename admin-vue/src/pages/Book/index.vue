<template>
  <div>
    <Table
      v-bind:columns="columns"
      :data="content"
      >
    </Table>
  </div>
</template>

<script>
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

      const content = [
        {
          id: 1,
          title: '冰雪奇缘'
        }
      ]

      return {
        columns,
        content
      }
    },
    methods: {
      onShowLevel (index) {
        /**@desc 
         * Go to level page of specific book
         * */
        this.$router.push(`/level/${this.content[index].id}`)
      }
    }
  }
</script>

<style>
</style>