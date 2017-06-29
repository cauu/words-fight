import { 
  getBooks,
  postBook,
  putBook
} from '../../services/book'

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
    const res = await getBooks({ pageSize, pageNo })

    commit(
      'setBookList', 
      {
        list: res.result.data,
        pagination: res.result.pagination
      }
    )
  },
  async createBook({ commit }, { book, cb }) {
    await postBook(book)

    cb && cb()
  },
  async updateBook({ commit }, { book, cb }) {
    await putBook(book)
    
    cb && cb()
  },
  async getBookById({ commit }, _id) {
    const res = await getBooks({ _id })

    commit('setBookDetail', res.result.data[0])
  }
}

export default {
  state,
  mutations,
  actions
}