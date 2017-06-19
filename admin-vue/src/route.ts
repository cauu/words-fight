declare var require: any

import Vue from 'vue';
import Router from 'vue-router'

/**
 * @desc import vue single file component
 */
const App = require('pages/app').default

const BookList = require('pages/book-list').default
const EditBook = require('pages/edit-book').default

const LevelList = require('pages/level-list').default
const EditLevel = require('pages/edit-level').default

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
          path: 'book/list',
          component: BookList
        },
        {
          path: 'book/edit/:bid?',
          component: EditBook,
          props: true
        },
        {
          path: 'level/list/:bid',
          component: LevelList,
          props: true
        },
        {
          path: 'level/edit/:bid/:lid?',
          component: EditLevel,
          props: true
        }
      ]
    }
  ]
});