import {
  getLevel,
  postLevel,
  putLevel
} from '../../services/level'

const state = {
  list: [],
  pagination: {},
  editLevel: {}
}

const mutations = {
  setLevelList(state, payload) {
    state.list = payload.list
    state.pagination = payload.pagination
  },
  setEditLevel(state, payload) {
    state.editLevel = payload
  },
  resetEditLevel(state, payload={}) {
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
  async listLevels({ commit }, { book, pageSize=10, pageNo=1 }) {
    const res = await getLevel({ book, pageSize, pageNo })

    commit(
      'setNavList',
      {
        nav: res.result.nav
      }
    )

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