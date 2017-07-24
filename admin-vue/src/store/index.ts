declare let process: any
declare let require: any

import Vue from 'vue'
import VueX from 'vuex'

import book from './modules/book'
import level from './modules/level'
import scene from './modules/scene'
import question from './modules/question'
import breadcrumb from './modules/breadcrumb'; 

Vue.use(VueX)

const debug: boolean = process.env !== 'production'

export default new VueX.Store({
  strict: debug,
  modules: {
    book,
    level,
    question,
    scene,
    breadcrumb
  }
})