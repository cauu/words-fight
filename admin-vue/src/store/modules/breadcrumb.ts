const state = {
  nav: {}
}

const mutations = {
  setNavList(state, payload) {
    state.nav = payload.nav
  }
}

const getters = {
  flattenedNavList(state) {
    const iterator = ['scene', 'level', 'book']
    const result = []
    let navObj = state.nav

    result.push(navObj)

    iterator.map((it) => {
      if(navObj[it]) {
        result.push(navObj[it])

        navObj = navObj[it]
      }
    })

    return result.reverse()
  }
}

export default {
  state,
  mutations,
  getters
}