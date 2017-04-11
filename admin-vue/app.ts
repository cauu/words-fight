declare var Vue: any

import Vue = require('vue')
var app = require('./app.vue').default

new Vue({
  el: '#app',
  render(h) {
    return h('h1', 'hello world');
  }
});