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
    title: ""
  }
}

const mutations = {
  setQuestionList(state, { list, pagination }) {
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
      anwser: [],
      next: []
    }
  },
  updateEditQuestion(state, payload) {
  }
}

const actions = {
  async listAllQuestions({ commit }, { question, pageSize = 100, pageNo = 1}) {
    const res = await getQuestions({ question, pageSize, pageNo })

    commit(
    )
  },
  async listQuestions({ commit }, { question, pageSize = 10, pageNo = 1 }) {
    const res = await getQuestions({ question, pageSize, pageNo })
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

    commit('')
  }
}

export default {
  state,
  actions,
  mutations
}