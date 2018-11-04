const { ccclass, property } = cc._decorator

@ccclass
export class StatusBar extends cc.Component {
    @property(cc.Node)
    statusWrapper: cc.Node = null;

    @property(cc.Node)
    myBlood: cc.Node = null;

    @property(cc.Node)
    enemyBlood: cc.Node = null;

    @property(cc.Node)
    countdown: cc.Node = null;

    @property(cc.Node)
    myAvatar: cc.Node = null;

    @property(cc.Node)
    enemyAvatar: cc.Node = null;

    onLoad() {
        
    }
}