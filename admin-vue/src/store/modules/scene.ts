import {
  getScene,
  postScene,
  putScene
} from '../../services/scene'

const state = {
  list: [],
  pagination: {},
  hehe: '123',
  editScene: {
    title: "test",
    next: [{}, {}]
  }
}

const mutations = {
  setSceneList(state, payload) {
    state.list = payload.list
    state.pagination = payload.pagination
  },
  setEditScene(state, payload) {
    state.editScene = payload
  },
  resetEditScene(state, payload={}) {
    state.editScene = {
      title: '',
      next: [],
      ...payload
    }
  },
  updateEditScene(state, payload) {
    state.editScene = {
      ...state.editScene,
      ...payload
    }
  }
}

const actions = {
  async listScenes({ commit }, { level, pageSize=10, pageNo=1 }) {
    const res = await getScene({ level, pageSize, pageNo })

    commit(
      'setSceneList',
      {
        list: res.result.data,
        pagination: res.result.pagination
      }
    )
  },
  async createScene({ commit }, { scene, cb }) {
    await postScene(scene)

    cb && cb()
  },
  async updateScene({ commit }, { scene, cb }) {
    await putScene(scene)

    cb && cb()
  },
  async getSceneById({ commit }, _id) {
    const res = await getScene({ _id })

    commit('setEditScenel', res.result.data[0])
  }
}

export default {
  state,
  mutations,
  actions
}