var _cacheList=
[
    "Image/Num",
    "Image/Card"
]

global.GTextureCache =
{
    _cacheAtlas:{},
    init:function(callback)
    {
        this._num = _cacheList.length
        for(var i in _cacheList)
        {
            this._cacheOne(_cacheList[i],callback)
        }
    },
    _cacheOne:function(path,callback)
    {
        var self = this
        cc.loader.loadRes(path, cc.SpriteAtlas, function(err, atlas){
            --self._num
            if(self._num==0&&callback)
            {
                callback()
            }
            if (err)
            {
                cc.log(err)
                return
            }
            self._cacheAtlas[path] = atlas
        })
    },
    getAtlas:function(path)
    {
        return this._cacheAtlas[path]
    },
    getSpriteFrame:function(atlasPath,key)
    {
        var atlas = this.getAtlas(atlasPath)
        if(!atlas)
        {
            return null
        }
        return atlas.getSpriteFrame(key)
    },
}
