module.exports = cc.Class({
    extends: cc.Component,

    ctor: function() {
      this.store = global.store

      this.dispatch = this.store.dispatch
    },

    properties: {
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
      var store = this.store

      if(!!store) {
        store.subscribe(function() {
          this.onStateChange(store.getState());
        }.bind(this))
      }
    },

    onStateChange: function(state) {
      cc.log('parent on state change')
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
