declare var require: any;

import * as Vue from 'vue';
import Router from 'vue-router';
// var Router = require('vue-router').default;
var App = require('./pages/App/index.vue').default;

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      component: App
    }
  ]
});