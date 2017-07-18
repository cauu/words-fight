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
              <Input 
                placeholder="请输入场景名称"
                v-model="title"
                />
            </Col>
          </Row>
        </Form-item>
        <content-box title="场景跳转">
          <Form-item 
            v-for="(next, index) in nextScene"
            >
            <Row>
              <label>
                {{ `规则${index + 1}` }}
              </label>
            </Row>
            <Row :gutter="16">
              <Col span="4">
                <Input 
                  :value="next.code"
                  placeholder="code"
                  @on-change="(event) => onInputCode(event, index)"
                  />
              </Col>
              <Col span="4">
                <scene-selector
                  :value="next.scene"
                  :on-change="(value) => onSceneSelect(value, index)"
                  :lid="lid"
                  />
              </Col>
              <Col v-if="index === nextScene.length - 1" span="2">
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
  import SceneSelector from 'components/scene-selector'

  interface IViewMessage {
    info: Function,
    success: Function,
    warning: Function,
    error: Function,
    loading: Function
  }

  @Component({
    props: {
      lid: String,
      sid: String,
    },
    components: {
      'ContentBox': ContentBox,
      'SceneSelector': SceneSelector
    }
  })
  export default class EditScene extends Vue {
    lid: string
    sid: string
    $Message: IViewMessage

    get title() {
      return this.editScene.title
    }

    set title(value) {
      this.updateEditScene({
        title: value
      });
    }

    get nextSceneKeys() {
      return Object.keys(this.editScene.next);
    }

    get nextScene() {
      return this.editScene.next
    }

    set nextScene(value) {
      console.log(value)
    }

    @State(state => state.scene.editScene) editScene

    @Action('createScene') createScene

    @Action('updateScene') updateScene

    @Action('getSceneById') getSceneById

    @Mutation('updateEditScene') updateEditScene

    @Mutation('resetEditScene') resetEditScene

    @Mutation('pushNextRule') pushNextRule

    @Mutation('popNextRule') popNextRule

    mounted() {
      if(!!this.sid) {
        this.getSceneById(this.sid);
      }
    }

    onInputCode(event, index) {
      const next = [...this.editScene.next]
      const code = event.target.value

      next[index] = {
        code,
        scene: this.editScene.next[index].scene,
      }

      this.updateEditScene({
        next
      })
    }

    onSceneSelect(scene, index) {
      const next = [...this.editScene.next]

      next[index] = {
        code: this.editScene.next[index].code,
        scene
      }

      this.updateEditScene({
        next
      })
    }

    onAddNext() {
      this.pushNextRule()
    }

    onDelNext() {
      this.popNextRule()
    }

    onSubmit() {
      const editFunc: Function = !!this.sid ? this.updateScene : this.createScene
      const scene = this.editScene
      if(!scene.level) {
        scene.level = this.lid
      }

      editFunc(
        {
          scene,
          cb: (res) => {
            let msg= (title) => !!this.sid ? `场景${title}更新成功` : `场景${title}创建成功`
            const { result } = res
            this.$Message.success(msg(result.title))
            this.onBack()
          }
        }
      )
    }

    onBack() {
      this.$router.push(`/scene/list/${this.lid}`)
    }
  }
</script>