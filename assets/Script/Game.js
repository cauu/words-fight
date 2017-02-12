global.Framework = {}

global.store = require('./Store/CreateStore.js')({})
require('./Libs/Md5.js')

require('./Utils/JsExtention.js')
require('./Utils/AudioTool.js')
require('./Utils/Helper.js')
require('./Utils/PrefabManager.js')
require('./Utils/TextureCache.js')

global.Framework.Page = require('./Page/Page.js')
global.Framework.PageManager = require('./Page/PageManager.js')

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad: function () {
    global.GPrefabManager.init()
    global.GTextureCache.init(this.onPreInitDone.bind(this))
  },

  onPreInitDone:function () {
     var pageNode = new cc.Node()
     pageNode.addComponent(global.Framework.PageManager)
     pageNode.parent = this.node.parent
    
    global.GPageMgr.openPage("Page_Main")
  }
});
