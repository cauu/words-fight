global.GPrefabManager = 
{
    _res:
    [
        "CommonView"
    ],
    _prefabs:{},
    init:function()
    {
        var self = this
        global.core.foreach(this._res,function(index,path)
        {
            cc.loader.loadRes(path, function (err, prefab) {
                if(prefab)
                {
                    self._prefabs[path] = prefab
                }
                else
                {
                    cc.error(err)
                }
            })
            
        })
    },
    getPrefab:function(path)
    {
        return this._prefabs[path]
    }
}
