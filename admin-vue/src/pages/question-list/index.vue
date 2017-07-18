<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">书本</Breadcrumb-item>
            <Breadcrumb-item>关卡</Breadcrumb-item>
            <Breadcumb-item>场景</Breadcumb-item>
          </Breadcrumb>
        </Col>
        <Col span="2">
          <route-link>
            <Button type="primary">
              创建问题
            </Button>
          </route-link>
        </Col>
      </Row>
    </section>
    <section>
      <Table
        :columns="columns"
        >
      </Table>
    </section>
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