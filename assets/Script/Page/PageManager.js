cc.Class({
    extends: cc.Component,

    properties: {
        _pages:{
            default:{}
        }
    },
    // use this for initialization
    onLoad: function () {
        global.GPageMgr = this
    },
    
    // called every frame
    update: function (dt) {

    },
    getPage:function(pageName)
    {
        return this._pages[pageName]
    },
    openPage:function(pageName,callback)
    {
        if(this.getPage(pageName))
        {
            return
        }
        var self = this
        var page = null
        cc.loader.loadRes("Page/" + pageName, function (err, prefab) {
            if(prefab)
            {
                page = cc.instantiate(prefab)
                page.parent=self.node
                self._pages[pageName] = page.getComponent(pageName)
                cc.log("open page success + "+pageName)
            }
            else
            {
                cc.error(err)
            }
        })
        return page
    },
    closePage:function(pageName)
    {
        var page = this._pages[pageName]
        this._pages[pageName] = null
        if(!page)
        {
            return
        }
        page.node.destroy()
    },
    closeAll:function()
    {
        global.core.foreach(this._pages,function(pageName,page)
        {
            if(!page)
            {
                return
            }
            page.node.destroy()
        })
        this._pages = {}
    }
})
