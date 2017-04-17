"use strict";
var Vue = require("vue");
//declare var require: any
//import App = require('./App')
var App_1 = require("./App");
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App: App_1["default"]
    }
});
