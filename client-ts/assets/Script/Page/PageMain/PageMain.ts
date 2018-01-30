import proxy from '../../Model';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageMain extends cc.Component {
  onLoad() {
  }

  async onStartClick(event, customEventData) {
    let result = await proxy.onEffect('battle/createConnection');

    proxy.onEffect('battle/initBattle', '59aa0f336dc9f502cafb55cc');
  }

  onJoinClick(event, customEventData) {
      proxy.onEffect('battle/joinBattle', {
        id: '59aa0f336dc9f502cafb55c1',
        username: 'yoyo',
        nickname: 'haha'
      }, '123');
  }
}
