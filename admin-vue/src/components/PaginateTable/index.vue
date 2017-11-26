<template>
  <div>
    <Table
      :columns="columns"
      :data="data"
      >
    </Table>
    <Page
      :current="pageNo"
      :total="total"
      :page-size="pageSize"
      size="small"
      >
    </Page>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      onChange: Function,
      pageNo: Number,
      pageSize: Number,
      total: Number,
      data: Array,
      columns: Array
    }
  })
  export default class PaginateTable extends Vue {
    parent: object

    onChange: Function

    pageNo: number

    pageSize: number

    total: number

    data: Array<any>

    columns: Array<any>
  }
</script>