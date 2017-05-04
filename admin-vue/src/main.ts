declare var require: any

import * as Vue from 'vue'
import * as iView from 'iview'

import router from './route'
import store from './store'

import './style/style.scss';

Vue.use(iView);

new Vue({
  router,
  store,
  components: {
    ...iView
  }
}).$mount('#app')
