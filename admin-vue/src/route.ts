declare var require: any

import Vue from 'vue';
import Router from 'vue-router'

/**
 * @desc import vue single file component
 */
const App = require('./pages/App').default
const Question = require('./pages/Question').default
const Book = require('./pages/Book').default

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
          component: Book
        },
        {
          path: 'level/:bid',
          component: Question
        }
      ]
    }
  ]
});