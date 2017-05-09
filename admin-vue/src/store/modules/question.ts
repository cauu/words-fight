import Types from '../../constants/mutation-types'

const state = {
  questions: []
}

const getters = {
}

const actions = {
}

const mutations = {
  [Types.LIST_QUESTIONS](state, payload) {
    state.questions = ['123', '456']
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}