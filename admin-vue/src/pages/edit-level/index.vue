<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item>书本</Breadcrumb-item>
            <Breadcrumb-item>关卡</Breadcrumb-item>
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
          label="名称"
          >
          <Row>
            <Col span="8">
              <Input v-model="title" type="text" placeholder="请输入关卡名称" />
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
  import {
    State,
    Action,
    Mutation
  } from 'vuex-class'

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

    get title() {
      return this.editLevel.title
    }

    set title(title) {
      this.updateEditLevel({ title })
    }

    @State(state => state.level.editLevel) editLevel

    @Action('createLevel') createLevel

    @Action('updateLevel') updateLevel

    @Action('getLevelById') getLevelById

    @Mutation('resetEditLevel') resetEditLevel

    @Mutation('updateEditLevel') updateEditLevel

    created() {
      if(!!this.lid) {
        this.getLevelById(this.lid)
      } else {
        this.resetEditLevel({
          book: this.bid
        })
      }
    }

    onBack() {
      this.$router.push(`/level/list/${this.bid}`)
    }

    onSubmit() {
      const editFunc: Function = this.lid ? this.updateLevel : this.createLevel

      editFunc(
        {
          level: this.editLevel,
          cb: () => this.onBack()
        }
      )
    }
  }

</script>