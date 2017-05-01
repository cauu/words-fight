declare let process: any;
declare let require: any;

import * as Vue from 'vue';
var VueX = require('vuex').default;
// import * as VueX from 'vuex';

Vue.use(VueX);

const debug = process.env.NODE_ENV !== 'production';

export default new VueX.Store({
  strict: debug,
  modules: {
  }
});