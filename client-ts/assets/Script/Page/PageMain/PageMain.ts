import proxy from '../../Model';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageMain extends cc.Component {
  onLoad() {
  }

  async onStartClick(event, customEventData) {
    let result = await proxy.onEffect('battle/createConnection');
    console.log('result', result);
  }

  onJoinClick(event, customEventData) {
      console.log('hehe');
  }
}
