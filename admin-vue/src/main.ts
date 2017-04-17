import Vue = require('vue')

declare var require: any
// import App = require('./App')
// import App from './App'

new Vue({
  el : '#app', 
  // template : '<App/>', 
  // components : {
  //   // App
  // }
  render(h) {
    return h('h1', 'hello world');
  }
})
