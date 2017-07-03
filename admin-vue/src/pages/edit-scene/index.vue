<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">
              书本
            </Breadcrumb-item>
            <Breadcrumb-item href="/level/list">
              关卡
            </Breadcrumb-item>
            <Breadcrumb-item>
              编辑场景
            </Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
    </section>
    <section class="content-main-wrapper">
      <Form
        :label-width="60">
        <Form-item
          label="名称">
          <Row>
            <Col span="8">
              <Input placeholder="请输入场景名称" />
            </Col>
          </Row>
        </Form-item>
        <content-box>
          <Form-item 
            v-for="(nextItem, idx) in nextScene"
            >
            <Row>
              <label>
                {{ `第${idx+1}` }}
              </label>
            </Row>
            <Row gutter="16">
              <Col span="4">
                <Input 
                  placeholder="code"
                  />
              </Col>
              <Col span="4">
                <Input 
                  placeholder="对应场景"
                  />
              </Col>
            </Row>
          </Form-item>
        </content-box>
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

  import ContentBox from 'components/content-box'

  @Component({
    props: {
      lid: String,
      sid: String
    },
    components: {
      'ContentBox': ContentBox
    }
  })
  export default class EditScene extends Vue {
    lid: string
    sid: string

    get nextScene() {
      return this.editScene.next
    }

    set nextScene(value) {
    }

    @State(state => state.scene.editScene) editScene

    @Action('createScene') createScene

    @Action('updateScene') updateScene

    @Mutation('resetEditScene') resetEditScene

    created() {
      // if(!this.sid) {
      //   this.resetEditScene()
      // }
    }
  }

</script>