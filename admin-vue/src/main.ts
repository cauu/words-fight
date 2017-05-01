declare var require: any

import * as Vue from 'vue';

import router from './route';
import store from './store/index';

new Vue({
  router,
  store,
  el : '#app', 
  template : '<router-view></router-view>'
})
