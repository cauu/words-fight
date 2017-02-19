global.AudioTool = {
    playMusic:function(path,loop)
    {
        path = cc.url.raw("resources/"+path)
        if(global.GSettingDataModel.musicOn<=0)
        {
            return
        }
        if(loop === undefined)
        {
            loop = true
        }
        cc.audioEngine.playMusic(path,loop)
    },
    playSound:function(path)
    {
        path = cc.url.raw("resources/"+path)
        if(global.GSettingDataModel.soundOn<=0)
        {
            return
        }
        return cc.audioEngine.playEffect(path)
    },
    stopSound:function(id)
    {
        if(!id)
        {
            return
        }
        cc.audioEngine.stopEffect(id)
    },
    playVoice(path)
    {
        path = cc.url.raw("resources/"+path)
        if(global.GSettingDataModel.voiceOn<=0)
        {
            return
        }
        return cc.audioEngine.playEffect(path)
    },     
    stopMusic:function()
    {
        cc.audioEngine.stopMusic(true)
    },
    stopAllSound:function()
    {
        cc.audioEngine.stopAllEffects()
    }
}
