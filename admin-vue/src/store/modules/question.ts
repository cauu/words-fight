import Vue from 'vue'
import {
  getQuestions,
  postQuestion,
  putQuestion,
  delQuestion
} from '../../services/question'

/**
 * @prop 
 * {object} all 用在选择器中，key：场景id, value：场景对应的所有问题
 * {array} list 当前场景的所有问题
 * {object} pagination 翻页信息
 * {object} editQuestion 当前正在编辑的问题
 **/
const state = {
  all: {},

  list: [],
  pagination: {},

  editQuestion: {
    title: "",
    next: [],
    answers: []
  }
}

const mutations = {
  setQuestionList(state, { nav, list, pagination }) {
    state.list = list
    state.pagination = pagination
  },
  setAllQuestions(state, { scene, all }) {
    Vue.set(state.all, scene,  all)
  },
  setEditQuestion(state, question) {
    state.editQuestion = question
  },
  resetEditQuestion(state, payload={}) {
    state.editQuestion = {
      title: '',
      answer: [],
      next: []
    }
  },
  updateEditQuestion(state, payload) {
    state.editQuestion = {
      ...state.editQuestion,
      ...payload
    }
  },
  pushNextRule() {
    state.editQuestion.next.push({
      shouldLeave: false,
      code: '',
      question: ''
    })
  },
  popNextRule() {
    state.editQuestion.next.pop()
  },
  pushAnswer() {
    state.editQuestion.answers.push({
      code: '',
      text: ''
    })
  },
  popAnswer() {
    state.editQuestion.answers.pop()
  }
}

const actions = {
  async listAllQuestions({ commit }, { scene, pageSize = 100, pageNo = 1}) {
    const res = await getQuestions({ scene, pageSize, pageNo })

    commit(
      'setAllQuestions',
      {
        scene,
        all: res.result.data
      }
    )
  },
  async listQuestions({ commit }, { scene, pageSize = 10, pageNo = 1 }) {
    const res = await getQuestions({ scene, pageSize, pageNo })

    commit('setNavList', {
      nav: res.result.nav
    })

    commit(
      'setQuestionList',
      {
        list: res.result.data,
        pagination: res.result.pagination
      }
    )
  },
  async createQuestion({ commit }, { question, cb }) {
    const result = await postQuestion(question)

    cb && cb(result)
  },
  async updateQuestion({ commit }, { question, cb}) {
    const result = await putQuestion(question)

    cb && cb(result)
  },
  async getEditQuestion({ commit }, _id) {
    const res = await getQuestions({ _id })

    commit('setEditQuestion', res.result.data[0])
  }
}

export default {
  state,
  actions,
  mutations
}