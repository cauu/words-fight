import API from '../../constants/api'
import { get, post } from '../../utils/fetch'

const state = {
  all: []
}

const mutations = {
  setBookList(state, payload) {
    state.all = payload
  }
}

const actions = {
  async listBooks({ commit }) {
    const res = await get(API.BOOKS, { pageSize: 10, pageNo: 1 })

    commit('setBookList', res.result.data)
  },
  async createBook({ commit }, { title, cb }) {
    await post(API.BOOKS, { title })

    cb && cb();
  }
}

export default {
  state,
  mutations,
  actions
}