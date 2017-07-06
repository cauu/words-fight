<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">书本</Breadcrumb-item>
            <Breadcrumb-item v-if="isEdit">编辑书本</Breadcrumb-item>
            <Breadcrumb-item v-else>新建书本</Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Form
        :label-width="60">
        <Form-item
          key="item"
          label="名称"
          >
          <Row>
            <Col span="8">
              <Input v-model="title" type="text" placeholder="请输入书本名称" />
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
  import { State, Action, Mutation } from 'vuex-class'

  @Component ({
    props: {
      bid: String
    }
  })
  export default class EditBook extends Vue {
    bid: string

    isEdit: boolean = !!this.bid

    get title() {
      return this.detail.title
    }

    set title(value) {
      this.updateDetail({ title: value })
    }

    @State(state => state.book.detail) detail

    @Action('createBook') createBook

    @Action('updateBook') updateBook

    @Action('getBookById') getBookById

    @Mutation('resetBookDetail') resetBookDetail

    @Mutation('updateDetail') updateDetail

    mounted() {
      if(this.bid) {
        this.getBookById(this.bid)
      } else {
        this.resetBookDetail()
      }
    }

    onBack() {
      this.$router.push('/book/list')
    }

    onSubmit() {
      const editFunc: Function = this.bid ? this.updateBook: this.createBook

      editFunc(
        { 
          book: this.detail,
          cb: () => { this.onBack() }
        }
      )
    }
  }

</script>