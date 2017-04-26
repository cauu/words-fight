declare var require: any;

import * as Vue from 'vue';
import * as Router from 'vue-router';

import App = require('./pages/App/index.vue').default;

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    path: '/',
    component: App
  ]
});