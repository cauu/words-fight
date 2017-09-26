import proxy from '../Model/index';

const {ccclass, property} = cc._decorator;

@ccclass
export default class PageGame extends cc.Component {
    onLoad() {
        // init logic
        proxy.onEffect('getLevelInfo');
    }
}
