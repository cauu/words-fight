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
        <content-box title="场景跳转">
          <Form-item 
            v-for="(nextItem, idx) in nextScene"
            >
            <Row>
              <label>
                {{ `规则${idx+1}` }}
              </label>
            </Row>
            <Row :gutter="16">
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
              <Col v-if="idx === nextScene.length - 1" span="2">
                <Button 
                  type="ghost"
                  icon="close"
                  shape="circle"
                  @click="onDelNext"
                  />
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Row style="margin-top: 10px">
              <Button @click="onAddNext">
                添加规则
              </Button>
            </Row>
          </Form-item>
        </content-box>
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

<style lang="scss" scoped>
  .content-box-wrapper {
    margin-bottom: 20px;
  }
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

    @Mutation('pushNextRule') pushNextRule

    @Mutation('popNextRule') popNextRule

    onAddNext() {
      this.pushNextRule()
    }

    onDelNext() {
      this.popNextRule()
    }

    onSubmit() {
    }

    onBack() {
      this.$router.push(`/scene/list/${this.lid}`)
    }

    created() {
      const editFunc: Function = this.sid ? this.updateScene : this.createScene;

      editFunc(
        {
          scene: this.editScene,
          cb: () => {
          }
        }
      )
    }
  }

</script>