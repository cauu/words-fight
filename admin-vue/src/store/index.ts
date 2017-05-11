declare let process: any
declare let require: any

import * as Vue from 'vue'
import VueX from 'vuex'

import question from './modules/question'
import book from './modules/book'

Vue.use(VueX)

const debug = process.env !== 'production'

export default new VueX.Store({
  strict: debug,
  modules: {
    book,
    question
  }
})