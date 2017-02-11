var core={}

global.core = core

core.isObject = function (param)
{
    return typeof (param) === "object"
}
core.isArray = function (param)
{
    return typeof (param) === "Array" || param instanceof Array
}
core.isNumber = function (param)
{
    return !isNaN(param)
}
core.isNaN = function (param)
{
    return isNaN(param)
}
core.isFunction = function (param)
{
    return typeof (param) === "function"
}
core.isString = function (param)
{
    return typeof (param) === "string"
}
core.random = function (min, max)
{
    switch (arguments.length)
    {
        case 1: return parseInt(Math.random() * min + 1)
        case 2: return parseInt(Math.random() * (max - min + 1) + min)
        default: return math.random()
    }
}
core.clone = function (obj)
{
    if (core.isUndefined(obj))
    {
        return null
    }
    if (core.isArray(obj))
    {
        var newArray = new Array()
        for (var i = 0, length = obj.length; i < length; ++i)
        {
            newArray[i] = this.clone(obj[i])
        }
        return newArray
    }
    if (core.isObject(obj))
    {
        var newObj = new Object()
        for (var i in obj)
        {
            newObj[i] = this.clone(obj[i])
        }
        return newObj
    }
    return obj
}
//合并但是不改变dest
core.merge = function (dest, src)
{
    var t = core.clone(dest)
    if (!src)
    {
        return t
    }
    if (core.isArray(src))
    {
        t = t || []
        var tlen = t.length
        for (var i = 0, len = src.length; i < len; ++i)
        {
            var value = src[i]
            if (core.isFunction(value))
            {
                continue
            }
            if (core.isArray(value) || core.isObject(value))
            {
                if (i < tlen)
                {
                    t[i] = core.merge(null, value)
                }
                else
                {
                    t.push(core.merge(null, value))
                }

            }
            else
            {
                if (i < tlen)
                {
                    t[i] = value
                }
                else
                {
                    t.push(value)
                }
            }
        }
    }
    else if (core.isObject(src))
    {
        t = t || {}
        for (var key in src)
        {
            var value = src[key]
            if (core.isFunction(value))
            {
                continue
            }
            if (core.isArray(value) || core.isObject(value))
            {
                t[key] = core.merge(null, value)
            }
            else
            {
                t[key] = value
            }
        }
    }
    else
    {
        t = src
    }
    return t
}
//只是取出template里面已经有的部分
core.getExit = function (template, src)
{
    if (!src || !template)
    {
        return {}
    }
    var t = {}
    for (var key in src)
    {
        if (core.isUndefined(template[key]))
        {
            continue
        }
        var value = src[key]
        if (core.isFunction(value))
        {
            continue
        }
        if (core.isArray(value) || core.isObject(value))
        {
            t[key] = core.getExit(template[key], value)
        }
        else
        {
            t[key] = value
        }
    }
    return t
}
core.dump = function (data)
{
    var strSpace = "    "
    var _dump = function (data, intent)
    {
        var startIntentStr = ""
        for (var i = 0; i < intent; ++i)
        {
            startIntentStr += strSpace
        }
        var contentStr = ""
        if (core.isArray(data))
        {
            contentStr += "\n" + startIntentStr + "[\n"
            for (var i = 0, length = data.length; i < length; ++i)
            {
                if (!core.isArray(data[i]) && !core.isObject(data[i]) && !core.isFunction(data[i]))
                {
                    contentStr += startIntentStr + strSpace + _dump(data[i], intent + 1) + ",\n"
                }
                else
                {
                    contentStr += startIntentStr + _dump(data[i], intent + 1) + ",\n"
                }
            }
            contentStr += startIntentStr + "]"
        }
        else if (core.isObject(data))
        {
            contentStr += startIntentStr + "{\n"
            for (var key in data)
            {
                contentStr += startIntentStr + strSpace + key + ":" + _dump(data[key], intent + 1) + ",\n"
            }
            contentStr += startIntentStr + "}"
        }
        else if (!core.isFunction(data))
        {
            if (core.isString(data))
            {
                return "\"" + data + "\""
            }
            return data
        }
        if (contentStr == "")
        {
            return ""
        }
        return contentStr
    }
    console.log(_dump(data, 0))
}

core.toArray = function (table)
{
    var array = []
    for (var key in table)
    {
        if (core.isFunction(table[key]))
        {
            continue
        }
        array.push(key)
        array.push(table[key])
    }
    return array
}

core.foreach = function (items, callback)
{
    if (!items || !callback)
    {
        return
    }
    if (core.isNumber(items))
    {
        for (var i = 0; i < items; ++i)
        {
            var ret = callback(i)
            if(ret)
            {
                return
            }
        }
    }
    else if (core.isString(items))
    {
        for (var i = 0, length = items.length; i < length; i++)
        {
            var ret = callback(i,items.charAt(i))
            if(ret)
            {
                return
            }
        }
    }
    else if (core.isArray(items))
    {
        for (var i = 0, length = items.length; i < length; ++i)
        {
            var ret = callback(i,items[i])
            if(ret)
            {
                return
            }
        }
    }
    else if (core.isObject(items))
    {
        for (var key in items)
        {
            var ret = callback(key,items[key])
            if(ret)
            {
                return
            }
        }
    }
    return
}

core.length = function (items)
{
    if(core.isArray(items))
    {
        return items.length
    }
    if(core.isObject)
    {
        var len = 0
        core.foreach(items,function()
        {
            ++len
        })
        return len
    }
    return 0
}
core.find = function (items, callback)
{
    if (!items || !callback)
    {
        return
    }
    if (core.isArray(items))
    {
        for (var i = 0, length = items.length; i < length; ++i)
        {
            if (callback(items[i]) === true)
            {
                return items[i]
            }
        }
    }
    else if (core.isObject(items))
    {
        for (var key in items)
        {
            if (callback(items[key]) === true)
            {
                return items[key]
            }
        }
    }
}

core.indexOf = function (items, value)
{
    if (!items || !value)
    {
        return -1
    }
    if (core.isArray(items))
    {
        for (var i = 0, length = items.length; i < length; ++i)
        {
            if (items[i] === value)
            {
                return i
            }
        }
    }
    else if (core.isObject(items))
    {
        for (var key in items)
        {
            if (items[key] === value)
            {
                return key
            }
        }
    }
    return -1
}
core.include = function(objs, key) 
{
    var r = false
    core.foreach(objs,function(k,obj)
    {
        if(k==key)
        {
            r = true
            return true
        }
    })
    return r
}
core.supportsWebSocket = function ()
{
    return window.WebSocket || window.MozWebSocket
}

core.userAgentContains = function (string)
{
    return navigator.userAgent.indexOf(string) != -1
}

core.isTablet = function (screenWidth)
{
    if (screenWidth > 640)
    {
        if ((core.userAgentContains('Android') && core.userAgentContains('Firefox'))
        || core.userAgentContains('Mobile'))
        {
            return true
        }
    }
    return false
}

core.isWindows = function ()
{
    return core.userAgentContains('Windows')
}

core.isChromeOnWindows = function ()
{
    return core.userAgentContains('Chrome') && core.userAgentContains('Windows')
}

core.canPlayMP3 = function ()
{
    return Modernizr.audio.mp3
}

core.isSafari = function ()
{
    return core.userAgentContains('Safari') && !core.userAgentContains('Chrome')
}

core.isOpera = function ()
{
    return core.userAgentContains('Opera')
}
core.isInt = function(n) {
    return (n % 1) === 0
}

core.removeAt = function(arr,index)
{
    if(typeof arr==="undefined" || typeof index==="undefined")
    {
        return arr
    }
    if (!core.isArray(arr))
    {
        return arr
    }
    var len = arr.length
    if(isNaN(index)||index>=len||index<0)
    {
        return arr
    }
    for(var i=0;i<len-1;++i)
    {
        if(i<index)
        {
            continue
        }
        else
        {
            arr[i] = arr[i+1]
        }
    }
    arr.length-=1
    return arr
}
core.char2buf = function(str)
{
　　var out = new ArrayBuffer(str.length*2);
　　var u16a= new Uint16Array(out);
　　var strs = str.split("");
　　for(var i =0 ; i<strs.length;i++)
    {
        u16a[i]=strs[i].charCodeAt();
　　}
　　return out;
}

core.array2arraybuffer = function(array) 
{
    var b = new ArrayBuffer(array.length);
    var v = new DataView(b, 0);
    for (var i = 0; i < array.length; i++) 
    {
        v.setUint8(i, array[i]);
    }
    return b;
}

core.arraybuffer2array = function(buffer) 
{
    var v = new DataView(buffer, 0);
    var a = new Array();
    for (var i = 0; i < v.byteLength; i++)
    {
        a[i] = v.getUint8(i);
    }
    return a;
}
 
core.firstCharUpCase = function(str)
{
    var reg = /\b(\w)|\s(\w)/g 
    str = str.toLowerCase() 
    return str.replace(reg,function(m){return m.toUpperCase()}) 
} 

core.getGoogleProtoSetName = function(str)
{
    var strs = str.split("_")
    var result = "set"
    global.core.foreach(strs,function(index,s)
    {
        result+=global.core.firstCharUpCase(s)
    })
    return result
}

core.convertIntToUInt8Array = function(num)
{
    var c2 = num%256
    var c1 = Math.floor(num/256)
    
    var c = [c1,c2]
    return c
}

core.convertUInt8ArrayToInt = function(array)
{
    if(array.length!=2)
    {
        return 0
    }
    return array[0]*256+array[1]
}
//从一个数组里面按照下标和长度的方式去获取另一个数组，至少返回空数组
//包含start
core.getArrayFromArray = function(data,start,l)
{
    var len = data.length
    start = start || 0//默认最开始
    l = l || len//默认到最后
    if(start>=len)
    {
        return []
    }
    var arr = []
    for(var i = start ;i<start+l&&i<len;++i)
    {
        arr.push(data[i])
    }
    return arr
}

core.blobToArrayBuffer = function(data,callback)
{
    if(cc.sys.isNative)
    {
        callback(data)
        return
    }
    var fileReader = new FileReader()
    fileReader.onload  = function(progressEvent) 
    {
        if(callback)
        {
            callback(this.result)
        }
    }
    fileReader.readAsArrayBuffer(data)
}
