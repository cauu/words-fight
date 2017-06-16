declare var require: any

import Vue from 'vue'
import iView from 'iview'

import router from './route'
import store from './store'

import './style/style.scss';

Vue.use(iView);

new Vue({
  router,
  store
}).$mount('#app')
