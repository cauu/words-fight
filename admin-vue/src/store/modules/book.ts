import API from '../../constants/api'
import { get, post, put } from '../../utils/fetch'

const state = {
  list: [],
  pagination: {},
  detail: {
    title: ''
  }
}

const mutations = {
  setBookList(state, payload) {
    const{ 
      list,
      pagination
    } = payload

    state.list = list 
    state.pagination = pagination 
  },
  setBookDetail(state, payload) {
    state.detail = payload
  },
  resetBookDetail(state) {
    state.detail = {
      title: ""
    }
  },
  updateDetail(state, payload) {
    state.detail = {
      ...state.detail,
      ...payload
    }
  }
}

const actions = {
  async listBooks({ commit }, { pageSize, pageNo }) {
    const res = await get(API.BOOKS, { pageSize, pageNo })

    commit(
      'setBookList', 
      {
        list: res.result.data,
        pagination: res.result.pagination
      }
    )
  },
  async createBook({ commit }, { book, cb }) {
    await post(API.BOOKS, book)

    cb && cb()
  },
  async updateBook({ commit }, { book, cb }) {
    await put(API.BOOKS, book)
    
    cb && cb()
  },
  async getBookById({ commit }, _id) {
    const res = await get(API.BOOKS, { _id })

    commit('setBookDetail', res.result.data[0])
  }
}

export default {
  state,
  mutations,
  actions
}