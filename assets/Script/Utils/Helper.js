var helper={}

global.GHelper = helper

/*
a = texture || string || spriteFrame
global.GHelper.createSprite(a)
global.GHelper.createSprite(a,"")
global.GHelper.createSprite(a,"",rect)
global.GHelper.createSprite(a,"",callback)
global.GHelper.createSprite(a,"",rect,callback)
*/
helper.createSprite = function(obj,callback,rect,suffix)
{
    suffix = suffix || ""
    var sp = global.GHelper.createNode(cc.Sprite)
    var t = typeof obj
    if(t=="string")
    {
        var params=
        {
            path:obj,
            rect:rect,
            name:obj+suffix,
        }
        global.GHelper.createSpriteFrame(params,function(sf)
        {
            if(!sf)
            {
                return
            }
            sp.spriteFrame = sf
            if(callback)
            {
                callback(sp)
            }
        },rect,suffix)
    }
    else if(t=="object")
    {
        var classname = cc.js.getClassName(obj)
        if(classname=="cc.Texture2D")
        {
            if(rect)
            {
                sp.spriteFrame = new cc.SpriteFrame(obj,rect)
            }
            else
            {
                sp.spriteFrame = new cc.SpriteFrame(obj)
            }
        }
        else if(classname=="cc.SpriteFrame")
        {
            sp.spriteFrame = obj
        }
        else
        {
            global.GHelper.createSpriteFrame(obj,function(sf)
            {
                if(!sf)
                {
                    return
                }
                sp.spriteFrame = sf
            },rect,suffix)
        }
        if(callback)
        {
            callback(sp)
        }
    }
    return sp
}

helper.createTexture = function(filepath,cb) 
{
    var bTrue = filepath[0] == "#"
    if(!bTrue){
        filepath = "resources/"+filepath+".png"
        filepath = cc.url.raw(filepath)
    }else{
        filepath = filepath.replace("#","")
        if(cc.sys.os == cc.sys.OS_WINDOWS){
            filepath = "resources/Image/bigAvatar/5.png"
            filepath = cc.url.raw(filepath)
        }
    }
    return cc.textureCache.addImage(filepath,cb)
}
/*
{
    texture:null,
    path:null,
    rect:null,
    name:""
}
*/
helper.createSpriteFrame = function(params,cb)
{
    if(global.core.isString(params))
    {
        params = {path:params}
    }
    params.name = params.name || params.path
    params.name = params.name.replace(".png","")
    params.name = params.name.replace(".jpg","")
    if(params.name)//先检查缓存是否纯在这个东西
    {
        var sf = cc.spriteFrameCache.getSpriteFrame(params.name)
        if(sf)
        {
            cb(sf)
            return
        }
    }
    if(params.texture)//是否有texture
    {
        if(params.rect)
        {
            sf = new cc.SpriteFrame(params.texture,params.rect)
        }
        else
        {
            sf = new cc.SpriteFrame(params.texture)
        }
        cc.spriteFrameCache.addSpriteFrame(sf,params.name)
        if(cb)
        {
            cb(sf)
        }
        
        return
    }
    else if(params.path)//最常见的路径加载
    {
        //如果名字和路径不同，则先加载为texture之后再加载，以免同一个图又不同的spriteframe对象
        if(params.path!==params.name)
        {
            global.GHelper.createTexture(params.path,function(tex)
            {
                params.texture = tex
                global.GHelper.createSpriteFrame(params,cb)
            })
            return
        }
        cc.loader.loadRes(params.path, cc.SpriteFrame, function(err, sf)
        {
            if(err)
            {
                cc.error(err)
                cb()
                return
            }
            cc.spriteFrameCache.addSpriteFrame(sf,params.name)
            if(params.rect)
            {
                sf.setRect(params.rect)
            }
            if(cb)
            {
                cb(sf)
            }
        })
    }
}
helper.createNode=function(type)
{
    var node = new cc.Node()
    if(type && global.core.isFunction(type))
    {
        return node.addComponent(type)
    }
    return node
}
//获取本地时间，严格上尽量用下面的获取服务器时间
helper.getLocalTime=function(format)
{
    var d = new Date()
    if(typeof format==="undefined")
    {
        return d.getTime()
    }
    return d.toString(format)
}
//获取服务器的时间
helper.getServerTime=function(format)
{
    var mill = global.GGameDataModel.getDiffServerTime() + new Date().getTime()
    if(typeof format==="undefined")
    {
        return mill
    }
    var d = new Date(mill)
    return d.toString(format)
}
//5位长度法缩略
helper.convertShortNum = function(string)
{
    if(!string)
    {
        return string
    }
    if(!global.core.isNumber(string))
    {
        return string
    }
    var num = string
    var w = "W"
    var y = "Y"
    w = global.GLocalizationDataModel.getStringByKey("Chinese_W")
    y = global.GLocalizationDataModel.getStringByKey("Chinese_Y")
    if(num<=99999)
    {
        num = ""+num
    }
    else if(num<=999999)
    {
        num = (Math.floor(num/100)/100)+w
    }
    else if(num<=9999999)
    {
        num = (Math.floor(num/1000)/10)+w
    }
    else if(num<=99999999)
    {
        num = Math.floor(num/10000)+w
    }
    else if(num<=999999999)
    {
        num = (Math.floor(num/100000)/1000)+y
    }
    else if(num<=9999999999)
    {
        num = (Math.floor(num/1000000)/100)+y
    }
    else if(num<=99999999999)
    {
        num = (Math.floor(num/10000000)/10)+y
    }
    else
    {
        num = Math.floor(num/100000000)+y
    }
    return num
}

helper.random = function (min, max) 
{
    if (!min) {
        return Math.random()
    }
    if (!max) {
        max = min
        min = 0
    }
    return Math.floor(Math.random() * (max - min)) + min
}

//屏幕中间小黑条提示
//传入的msg多语言如果找不到的话，直接显示那个词语
helper.showTip = function(msg,time)
{
    var str = global.GLocalizationDataModel.getStringByKey(msg)
    var noTip = global.GLocalizationDataModel.getTipStr()
    if(str != noTip)
    {
        msg = str
    }
    global.GTipLabel.show(msg,time)
}

helper.getOpenUDID = function()
{
    return global.GJniHelper.getOpenUDID()
}

helper.saveData = function(data)
{
    global.core.foreach(data,function(key,value)
    {
        cc.sys.localStorage.setItem(key,value)
    })
}
helper.clearData = function()
{
    cc.sys.localStorage.clear()
}

helper.createFont = function(path,cb)
{
    cc.loader.loadRes(path,cc.TTFFont,function(err,font)
    {
        if(cb)
        {
            cb(font)
        }
    })
}

helper.getMD5=function(str)
{
    return global.GMd5(str)
}

helper.changeLevel = function(level){
    var _value = 0 
    var _text = 0
    var tip = global.GLocalizationDataModel.getStringByKey("Label_Level")
    _value = level
    if(_value <=17){
        if(_value == 0){_text = 0}
        else{
            _text = 19 - _value
        }
    }else if(_value > 17){
        tip = global.GLocalizationDataModel.getStringByKey("Label_Dan")
        _text = _value - 17
    }
    var ret = {}
    ret.text = _text + tip
    ret.value = _value
    return ret
}


helper.debug=true;
helper._log_type="e";//e,i,d,w,v
helper._log_tag="play2learn";
helper.log = function(info,tag,type)
{
    if(helper.debug==false) 
    {
        return
    }
    type=type || helper._log_type
    tag=tag || helper._log_tag
    if(info==null) 
    {
        info=="null"
    }
    var infoType=typeof (info)
    if(infoType=="object" ||infoType=="array")
    {
        info=JSON.stringify(info)
    }
    else if (infoType=="number")
    {
        info=info+""
    }
    else if(infoType=="boolean")
    {
        info=info+""
    }
    if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID)
    {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "Log", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",type,tag,info)
    }
    else
    {
        cc.log(info);
    }
}
helper.setLog=function(type,tag)
{
    helper._log_type=type;
    helper._log_tag=tag;
}

helper.removeEmojiChar=function(str)
{
    return str
}

helper.removeRefuseWord=function(str)
{
    return str
}

helper.getStoragePath=function(str)
{
    return jsb.fileUtils.getWritablePath()
}

helper.makeDir=function (path)
{
    var folders=path.split("/")
    if (folders==null)
    {
        return
    }
    var dir=""
    for(i=0;i<folders.length-1;i++)
    {
        dir=dir+folders[i]+"/"
        jsb.fileUtils.createDirectory(dir);
    }
}
helper.createSelfAvatarName=function (path)
{
    //自己头像的命名
    var separator = "_"
    var rid = global.GRoleManager.getSelfRid()
    if(rid <= 0){
        rid = "XXX"
    }
    var name = global.GPlatformDataModel.platformId + separator
    name = name +global.GPlatformDataModel.channelId +separator
    name = name + "Avatar" +separator + rid + separator
    name = name +global.GHelper.getLocalTime() +".jpg"
    return name
}

helper.createSelfTableVoiceName = function()
{
    //----自己牌桌语音的命名
    var separator = "_"
    var rid = global.GRoleManager.getSelfRid()
    if(rid == undefined || rid <= 0)
    {
        rid = "XXX"
    }
    var name = global.GPlatformDataModel.platformId + separator
    name = name + global.GPlatformDataModel.channelId + separator
    name = name + "Table_Voice" + separator + rid + separator
    name = name + global.GHelper.getLocalTime() + ".mp3"
    return name
}

helper.convertToMp3 = function(params)
{
    global.GHelper.log("endter convert to mp3")
    if (!jsb.fileUtils.isFileExist(params.input))
    {
        global.GHelper.log("not is file exitst ...")
        return false
    }
    global.GHelper.log("start convert to mp3")
    LameConvert.ConvertToMp3(params.input, params.output)
    this._convertParams = params
    var act1 = cc.delayTime(5)
    var act2 = cc.callFunc(function(){
        this.convertEndEvent()
    },this)
    var sequence = cc.sequence(act1, act2)
    this.node = new cc.Node();
    this.node.runAction(sequence)
    //cc.director.getScheduler().scheduleCallbackForTarget(this, this.convertEndEvent, 1, 1, 5, false)
}

helper.convertEndEvent = function()
{        
    var isFinish = LameConvert.isConvertFinish()
    global.GHelper.log("return convert ..." + isFinish)
    if (!isFinish)
    {
        global.GHelper.log("not finish convert ...")
        return 
    }
    global.GHelper.log("finish convert ...")
    var params = this._convertParams
    if (params.endEvent)
    {
        global.GHelper.log("call back ..." + params)
        params.endEvent(params)
    }
}
helper.seprarateIpAndPort = function(ipPort){        
    var strs= new Array(); 
    strs=ipPort.split(":"); 
    return strs 
}

module.exports = helper
