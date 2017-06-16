declare var require: any

import Vue from 'vue';
import Router from 'vue-router'

/**
 * @desc import vue single file component
 */
const App = require('pages/app').default
const BookList = require('pages/book-list').default
const LevelList = require('pages/level-list').default
const Question = require('pages/question-list').default

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: 'book',
          component: BookList
        },
        {
          path: 'level/:bid',
          component: LevelList
        }
      ]
    }
  ]
});