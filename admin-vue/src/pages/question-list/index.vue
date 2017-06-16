<template>
  <div>
    <Table
      v-bind:columns="columns"
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
        }
      ];
      return {
        columns
      }
    }
  }
</script>

<style>
</style>