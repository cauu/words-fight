declare var require: any

import * as Vue from 'vue';
import Router from 'vue-router'
// var Router = require('vue-router').default;
var App = require('./pages/App').default
var Question = require('./pages/Question').default
var Book = require('./pages/Book').default

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