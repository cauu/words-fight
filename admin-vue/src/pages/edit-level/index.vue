<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">书本</Breadcrumb-item>
            <Breadcrumb-item :href="`/level/list/${bid}`">关卡</Breadcrumb-item>
            <Breadcrumb-item v-if="isEdit">编辑关卡</Breadcrumb-item>
            <Breadcrumb-item v-else>新建关卡</Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Form
        :label-width="60">
        <Form-item
          :key="item"
          label="名称"
          >
          <Row>
            <Col span="8">
              <Input type="text" placeholder="请输入关卡名称" />
            </Col>
          </Row>
        </Form-item>
        <Form-item>
          <Row>
            <Button type="primary" @click="onSubmit">提交</Button>
            <Button type="ghost" @click="onBack" style="margin-left:8px">返回</Button>
          </Row>
        </Form-item>
      </Form>
    </section>
  </div>
</template>

<style>
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State } from 'vuex-class'

  @Component({
    props: {
      lid: String,
      bid: String
    }
  })
  export default class EditLevel extends Vue {
    lid: string
    bid: string

    isEdit = !!this.lid

    onBack() {
      this.$router.push(`/level/list/${this.bid}`);
    }

    onSubmit() {
    }
  }

</script>