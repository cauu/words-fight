<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <crumb-nav
            v-if="isEdit"
            currCode="question"
            currText="编辑问题"
            />
          <crumb-nav
            v-else
            currCode="question"
            currText="新建问题"
            />
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
        <Form-item
          label="问题类型"
          >
          <Row>
            <Col span="8">
              <Input
                v-model="type"
                placeholder="请输入问题类型"
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
                  @on-change="(event) => onInputNextRuleCode(event, index)"
                  />
              </Col>
              <Col span="4">
                <question-selector
                  :value="next.question"
                  :sid="sid"
                  :on-change="(value) => onSelectNextQuestion(value, index)"
                  />
              </Col>
              <Col span="4">
                <label class="ivu-form-item-label">退出场景:</label>
                <i-switch
                  :value="next.shouldLeave"
                  @on-change="(value) => onShouldNextLeave(value, index)"
                  >
                </i-switch>
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
                  @on-change="(value) => onInputAnswerText(value, index)"
                  />
              </Col>
              <Col span="4">
                <Input
                  :value="answer.code"
                  placeholder="code"
                  @on-change="(value) => onInputAnswerCode(value, index)"
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

<style scoped>
  .content-box-wrapper {
    margin-bottom: 20px;
  }
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action, Mutation } from 'vuex-class'

  import ContentBox from '../../components/content-box'
  import QuestionSelector from '../../components/question-selector'
  import CrumbNav from '../../components/crumb-nav'

  interface IViewMessage {
    info: Function,
    success: Function,
    warning: Function,
    error: Function,
    loading: Function
  }

  @Component({
    props: {
      sid: String,
      qid: String
    },
    components: {
      ContentBox,
      QuestionSelector,
      CrumbNav
    }
  })
  export default class EditQuestion extends Vue {
    sid: string
    qid: string
    $Message: IViewMessage

    isEdit = !!this.qid

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

    get type() {
      return this.editQuestion.type
    }

    set type(type) {
      this.updateEditQuestion({
        type
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

    onInputNextRuleCode(e, index) {
      const next = this.nextRule
      const code = e.target.value

      next[index] = {
        ...next[index],
        code
      }

      this.updateEditQuestion({
        next
      })
    }

    onSelectNextQuestion(question, index) {
      const next = this.nextRule

      next[index] = {
        ...next[index],
        question
      }

      this.updateEditQuestion({
        next
      })
    }

    onShouldNextLeave(shouldLeave, index) {
      const next = this.nextRule

      next[index] = {
        ...next[index],
        shouldLeave
      }

      this.updateEditQuestion({
        next
      })
    }

    onInputAnswerText(e, index) {
      const answers = this.answers
      const text = e.target.value

      answers[index] = {
        ...answers[index],
        text
      }

      this.updateEditQuestion({
        answers
      })
    }

    onInputAnswerCode(e, index) {
      const answers = this.answers
      const code = e.target.value

      answers[index] = {
        ...answers[index],
        code
      }

      this.updateEditQuestion({
        answers
      })
    }

    onAddNextRule() {
      this.pushNextRule()
    }

    onDelNextRule() {
      this.popNextRule()
    }

    onAddAnswer() {
      this.pushAnswer()
    }

    onDelAnswer() {
      this.popAnswer()
    }

    onSubmit() {
      const editFunc: Function = !!this.qid ? this.updateQuestion : this.createQuestion
      const question = this.editQuestion

      if(!question.scene) {
        question.scene = this.sid
      }

      editFunc(
        {
          question,
          cb: (res) => {
            let msg= (title) => !!this.qid ? `问题${title}更新成功` : `问题${title}创建成功`
            const { result } = res
            this.$Message.success(msg(result.title))
            this.onBack()
          }
        }
      )
    }

    onBack() {
      this.$router.push(`/question/list/${this.sid}`)
    }
  }
</script>