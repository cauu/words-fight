import {
  getLevel,
  postLevel,
  putLevel
} from '../../services/level'

const state = {
  list: [],
  pagination: {},
  editLevel: {},
  all: [
    {
      id: 1,
      title: '第一关'
    },
    {
      id: 2,
      title: '第二关'
    }
  ]
}

const mutations = {
  setLevelList(state, payload) {
    state.list = payload.list
    state.pagination = payload.pagination
  },
  setEditLevel(state, payload) {
    state.editLevel = payload
  },
  resetEditLevel(state, payload) {
    state.editLevel = {
      ...payload
    }
  },
  updateEditLevel(state, payload) {
    state.editLevel = {
      ...state.editLevel,
      ...payload
    }
  }
}

const actions = {
  async listLevels({ commit }, { book, pageSize, pageNo }) {
    const res = await getLevel({ book, pageSize, pageNo })

    commit(
      'setLevelList',
      {
        list: res.result.data,
        pagination: res.result.pagination
      }
    )
  },
  async createLevel({ commit }, { level, cb }) {
    await postLevel(level)

    cb && cb()
  },
  async updateLevel({ commit }, { level, cb }) {
    await putLevel(level)

    cb && cb()
  },
  async getLevelById({ commit }, _id) {
    const res = await getLevel({ _id })

    commit('setEditLevel', res.result.data[0])
  }
}

export default {
  state,
  mutations,
  actions
}