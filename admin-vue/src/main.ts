declare var require: any

// import Vue = require('vue')
import * as Vue from 'vue';
// var App = require('./pages/App/index.vue').default;
import App from './pages/App/index.vue';

new Vue({
  el : '#app', 
  template : '<App/>', 
  components: {
    App
  }
})
