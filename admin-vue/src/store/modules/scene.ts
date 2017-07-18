import Vue from 'vue'
import {
  getScene,
  postScene,
  putScene
} from '../../services/scene'

const state = {
  list: [],
  all: {},
  pagination: {},
  editScene: {
    title: "",
    next: []
  }
}

const mutations = {
  setSceneList(state, payload) {
    state.list = payload.list
    state.pagination = payload.pagination
  },
  setAllScenes(state, payload) {
    const { level } = payload
    Vue.set(state.all, level, payload.all)
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
  },
  pushNextRule() {
    state.editScene.next.push({
      code: '',
      scene: ''
    });
  },
  popNextRule() {
    state.editScene.next.pop();
  }
}

const actions = {
  async listAllScenes({ commit }, { level, pageSize=100, pageNo = 1}) {
    const res = await getScene({ level, pageSize, pageNo })

    commit(
      'setAllScenes',
      {
        level,
        all: res.result.data
      }
    )
  },
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
    const result = await postScene(scene)

    cb && cb(result)
  },
  async updateScene({ commit }, { scene, cb }) {
    const result = await putScene(scene)

    cb && cb(result)
  },
  async getSceneById({ commit }, _id) {
    const res = await getScene({ _id })

    commit('setEditScene', res.result.data[0])
  }
}

export default {
  state,
  mutations,
  actions
}