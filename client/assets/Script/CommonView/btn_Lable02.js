
cc.Class({
    extends: cc.Component,

    properties: {
        button01: {
            default: null,
            type: cc.Button
        },
        button02: {
            default: null,
            type: cc.Button
        },
        button03: {
            default: null,
            type: cc.Button
        },
        Label01:{
            default:null,
            type:cc.Node
        },
        Label02:{
            default:null,
            type:cc.Node
        },
        Label03:{
            default:null,
            type:cc.Node
        },
        LabelIcon01:{
            default:null,
            type:cc.Node
        },
        LabelIcon02:{
            default:null,
            type:cc.Node
        },
        LabelIcon03:{
            default:null,
            type:cc.Node
        },

    },
    onLoad: function() {
        this.button01.interactable = false;
        this.button02.interactable = true;
		this.button03.interactable = true;
        this.Label01.color = cc.color(255,255,255,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
        this.LabelIcon01.active = true;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
    },
    
    onBtn01Clicked: function() {
        this.button01.interactable = false;
        this.button02.interactable = true;
        this.button03.interactable = true;
        this.Label01.color = cc.color(255,255,255,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
        this.LabelIcon01.active = true;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
    },

    onBtn02Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = false;
        this.button03.interactable = true;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(255,255,255,255)
		this.Label03.color = cc.color(77,160,200,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = true;
		this.LabelIcon03.active = false;
    },

	onBtn03Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = true;
        this.button03.interactable = false;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(255,255,255,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = true;
     },



});


