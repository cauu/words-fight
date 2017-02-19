var Page = require('./Page.js');

cc.Class({
    extends: Page,

    ctor: function() {
    },

    properties: {
      btn_start: {
        default: null,
        type: cc.Button
      }
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
      this._super()
    },

    // on store change
    onStateChange(state) {
      console.log('on status change', state);
    },

    // events
    onStartClick: function() {
      this.dispatch({
        type: 'test'
      });
    },

    onRankClick: function() {
    },

    onGameClick: function() {
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },
});
