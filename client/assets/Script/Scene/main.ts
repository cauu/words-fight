const {ccclass, property} = cc._decorator;

/**
 * @todo
 * 1. 添加对按钮的引用
 * 2. onClick回调，跳转到对应的页面
 */
@ccclass
export class Main extends cc.Component {
  @property(cc.Node)
  btnRankBattle: cc.Node = null;

  @property(cc.Node)
  btnFriendsBattle: cc.Node = null;

  @property(cc.Node)
  btnToRank: cc.Node = null;

  @property(cc.Node)
  btnToStore: cc.Node = null;

  @property(cc.Node)
  btnToPackage: cc.Node = null;

  onLoad = () => {
    // this._initBtns();
    console.log(this.btnFriendsBattle);
    this.btnFriendsBattle.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
      console.log('cool');
    });

    console.log(cc.Node.EventType.MOUSE_DOWN)
  }

  _initBtns = () => {
    console.log('iunit')
    this.btnRankBattle.on('mousedown', () => {
      console.log('cool');
      cc.director.loadScene('Page_rankGame');
    });

    this.btnFriendsBattle.on('mousedown', () => {
      cc.director.loadScene('');
    });

    this.btnToRank.on('mousedown', () => {
      cc.director.loadScene("MyScene");
    });

    this.btnToPackage.on('mousedown', () => {
      cc.director.loadScene("MyScene");
    });

    this.btnToStore.on('mousedown', () => {
      cc.director.loadScene("MyScene");
    });
  }
}
