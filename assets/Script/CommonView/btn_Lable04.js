
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
        button04: {
            default: null,
            type: cc.Button
        },
        button05: {
            default: null,
            type: cc.Button
        },
        button06: {
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
        Label04:{
            default:null,
            type:cc.Node
        },
        Label05:{
            default:null,
            type:cc.Node
        },
        Label06:{
            default:null,
            type:cc.Node
        },
        LabelNum01:{
            default:null,
            type:cc.Node
        },
        LabelNum02:{
            default:null,
            type:cc.Node
        },
        LabelNum03:{
            default:null,
            type:cc.Node
        },
        LabelNum04:{
            default:null,
            type:cc.Node
        },
        LabelNum05:{
            default:null,
            type:cc.Node
        },
        LabelNum06:{
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
        LabelIcon04:{
            default:null,
            type:cc.Node
        },
        LabelIcon05:{
            default:null,
            type:cc.Node
        },
        LabelIcon06:{
            default:null,
            type:cc.Node
        },

    },
    onLoad: function() {
        this.button01.interactable = false;
        this.button02.interactable = true;
		this.button03.interactable = true;
		this.button04.interactable = true;
		this.button05.interactable = true;
		this.button06.interactable = true;
        this.Label01.color = cc.color(255,255,255,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
		this.Label04.color = cc.color(77,160,200,255)
		this.Label05.color = cc.color(77,160,200,255)
		this.Label06.color = cc.color(77,160,200,255)
		this.LabelNum01.color = cc.color(255,255,255,255)
        this.LabelNum02.color = cc.color(207,245,255,255)
		this.LabelNum03.color = cc.color(207,245,255,255)
		this.LabelNum04.color = cc.color(207,245,255,255)
		this.LabelNum05.color = cc.color(207,245,255,255)
		this.LabelNum06.color = cc.color(207,245,255,255)
        this.LabelIcon01.active = true;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
		this.LabelIcon04.active = false;
		this.LabelIcon05.active = false;
		this.LabelIcon06.active = false;
    },
    
    onBtn01Clicked: function() {
        this.button01.interactable = false;
        this.button02.interactable = true;
        this.button03.interactable = true;
		this.button04.interactable = true;
		this.button05.interactable = true;
		this.button06.interactable = true;
        this.Label01.color = cc.color(255,255,255,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
		this.Label04.color = cc.color(77,160,200,255)
		this.Label05.color = cc.color(77,160,200,255)
		this.Label06.color = cc.color(77,160,200,255)
		this.LabelNum01.color = cc.color(255,255,255,255)
        this.LabelNum02.color = cc.color(207,245,255,255)
		this.LabelNum03.color = cc.color(207,245,255,255)
		this.LabelNum04.color = cc.color(207,245,255,255)
		this.LabelNum05.color = cc.color(207,245,255,255)
		this.LabelNum06.color = cc.color(207,245,255,255)
        this.LabelIcon01.active = true;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
		this.LabelIcon04.active = false;
		this.LabelIcon05.active = false;
		this.LabelIcon06.active = false;
    },

    onBtn02Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = false;
        this.button03.interactable = true;
		this.button04.interactable = true;
		this.button05.interactable = true;
		this.button06.interactable = true;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(255,255,255,255)
		this.Label03.color = cc.color(77,160,200,255)
		this.Label04.color = cc.color(77,160,200,255)
		this.Label05.color = cc.color(77,160,200,255)
		this.Label06.color = cc.color(77,160,200,255)
		this.LabelNum01.color = cc.color(207,245,255,255)
        this.LabelNum02.color = cc.color(255,255,255,255)
		this.LabelNum03.color = cc.color(207,245,255,255)
		this.LabelNum04.color = cc.color(207,245,255,255)
		this.LabelNum05.color = cc.color(207,245,255,255)
		this.LabelNum06.color = cc.color(207,245,255,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = true;
		this.LabelIcon03.active = false;
		this.LabelIcon04.active = false;
		this.LabelIcon05.active = false;
		this.LabelIcon06.active = false;
    },

	onBtn03Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = true;
        this.button03.interactable = false;
		this.button04.interactable = true;
		this.button05.interactable = true;
		this.button06.interactable = true;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(255,255,255,255)
		this.Label04.color = cc.color(77,160,200,255)
		this.Label05.color = cc.color(77,160,200,255)
		this.Label06.color = cc.color(77,160,200,255)
		this.LabelNum01.color = cc.color(207,245,255,255)
        this.LabelNum02.color = cc.color(207,245,255,255)
		this.LabelNum03.color = cc.color(255,255,255,255)
		this.LabelNum04.color = cc.color(207,245,255,255)
		this.LabelNum05.color = cc.color(207,245,255,255)
		this.LabelNum06.color = cc.color(207,245,255,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = true;
		this.LabelIcon04.active = false;
		this.LabelIcon05.active = false;
		this.LabelIcon06.active = false;
     },

	onBtn04Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = true;
        this.button03.interactable = true;
		this.button04.interactable = false;
		this.button05.interactable = true;
		this.button06.interactable = true;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
		this.Label04.color = cc.color(255,255,255,255)
		this.Label05.color = cc.color(77,160,200,255)
		this.Label06.color = cc.color(77,160,200,255)
		this.LabelNum01.color = cc.color(207,245,255,255)
        this.LabelNum02.color = cc.color(207,245,255,255)
		this.LabelNum03.color = cc.color(207,245,255,255)
		this.LabelNum04.color = cc.color(255,255,255,255)
		this.LabelNum05.color = cc.color(207,245,255,255)
		this.LabelNum06.color = cc.color(207,245,255,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
		this.LabelIcon04.active = true;
		this.LabelIcon05.active = false;
		this.LabelIcon06.active = false;
     },

	onBtn05Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = true;
        this.button03.interactable = true;
		this.button04.interactable = true;
		this.button05.interactable = false;
		this.button06.interactable = true;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
		this.Label04.color = cc.color(77,160,200,255)
		this.Label05.color = cc.color(255,255,255,255)
		this.Label06.color = cc.color(77,160,200,255)
		this.LabelNum01.color = cc.color(207,245,255,255)
        this.LabelNum02.color = cc.color(207,245,255,255)
		this.LabelNum03.color = cc.color(207,245,255,255)
		this.LabelNum04.color = cc.color(207,245,255,255)
		this.LabelNum05.color = cc.color(255,255,255,255)
		this.LabelNum06.color = cc.color(207,245,255,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
		this.LabelIcon04.active = false;
		this.LabelIcon05.active = true;
		this.LabelIcon06.active = false;
     },

	onBtn06Clicked: function() {
        this.button01.interactable = true;
        this.button02.interactable = true;
        this.button03.interactable = true;
		this.button04.interactable = true;
		this.button05.interactable = true;
		this.button06.interactable = false;
        this.Label01.color = cc.color(77,160,200,255)
        this.Label02.color = cc.color(77,160,200,255)
		this.Label03.color = cc.color(77,160,200,255)
		this.Label04.color = cc.color(77,160,200,255)
		this.Label05.color = cc.color(77,160,200,255)
		this.Label06.color = cc.color(255,255,255,255)
		this.LabelNum01.color = cc.color(207,245,255,255)
        this.LabelNum02.color = cc.color(207,245,255,255)
		this.LabelNum03.color = cc.color(207,245,255,255)
		this.LabelNum04.color = cc.color(207,245,255,255)
		this.LabelNum05.color = cc.color(207,245,255,255)
		this.LabelNum06.color = cc.color(255,255,255,255)
        this.LabelIcon01.active = false;
        this.LabelIcon02.active = false;
		this.LabelIcon03.active = false;
		this.LabelIcon04.active = false;
		this.LabelIcon05.active = false;
		this.LabelIcon06.active = true;
     },


});


