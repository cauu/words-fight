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
              问题
            </Breadcrumb-item>
            <Breadcrumb-item>
              编辑问题
            </Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
    </section>

    <section class="content-main-wrapper">
      <Form
        :label-width="60">
        <Form-item
          label="问题名称"
          >
          <Row>
            <Col span="8">
              <Input
                v-model="title"
                placeholder="请输入问题名称"
                />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="问题文本"
          >
          <Row>
            <Col span="8">
              <Input
                v-model="text"
                placeholder="请输入问题文本"
                />
            </Col>
          </Row>
        </Form-item>

        <content-box title="跳转规则">
          <Form-item
            v-for="(next, index) in nextRule"
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
                  @on-change="(event) => onInputNextRuleCode"
                  />
              </Col>
              <Col span="4">
              </Col>
              <Col v-if="index === nextRule.length - 1" span="2">
                <Button
                  type="ghost"
                  icon="close"
                  shape="circle"
                  @click="onDelNextRule"
                  />
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Row style="margin-top: 10px">
              <Button @click="onAddNextRule">
                添加规则
              </Button>
            </Row>
          </Form-item>
        </content-box>

        <content-box title="答案配置">
          <Form-item
            v-for="(answer, index) in answers"
            >
            <Row>
              <label>
                {{ `问题${index + 1}` }}
              </label>
            </Row>
            <Row :gutter="16">
              <Col span="4">
                <Input
                  :value="answer.text"
                  placeholder="text"
                  />
              </Col>
              <Col span="4">
                <Input
                  :value="answer.code"
                  placeholder="code"
                  />
              </Col>
              <Col v-if="index === answers.length - 1" span="2">
                <Button
                  type="ghost"
                  icon="close"
                  shape="circle"
                  @click="onDelAnswer"
                  />
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Row style="margin-top: 10px">
              <Button @click="onAddAnswer">
                添加答案
              </Button>
            </Row>
          </Form-item>
        </content-box>
      </Form>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action, Mutation } from 'vuex-class'

  import ContentBox from '../../components/content-box'

  @Component({
    props: {
      sid: String,
      qid: String
    },
    components: {
      ContentBox
    }
  })
  export default class EditQuestion extends Vue {
    sid: string
    qid: string

    get title() {
      return this.editQuestion.title
    }

    set title(title) {
      this.updateEditQuestion({
        title
      })
    }

    get text() {
      return this.editQuestion.text
    }

    set text(text) {
      this.updateEditQuestion({
        text
      })
    }

    get answers() {
      return this.editQuestion.answers
    }

    get nextRule() {
      return this.editQuestion.next
    }

    @State(state => state.question.editQuestion) editQuestion

    @Action('createQuestion') createQuestion

    @Action('updateQuestion') updateQuestion

    @Action('getEditQuestion') getEditQuestion

    @Mutation('updateEditQuestion') updateEditQuestion

    @Mutation('resetEditQuestion') resetEditQuestion

    @Mutation('pushNextRule') pushNextRule

    @Mutation('popNextRule') popNextRule

    @Mutation('pushAnswer') pushAnswer

    @Mutation('popAnswer') popAnswer

    mounted() {
      if(!!this.qid) {
        this.getEditQuestion(this.qid)
      }
    }

    onAddNextRule() {
      this.pushNextRule()
    }

    onDelNextRule() {
      this.popNextRule()
    }

    onAddAnswer() {
      console.log('on add answer')
      this.pushAnswer()
    }

    onDelAnswer() {
      this.popAnswer()
    }
  }
</script>