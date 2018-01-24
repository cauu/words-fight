import GPrefabManager from './Utils/PrefabManager';
import GPageManager from './Page/PageManager';

import ModelProxy from './Model/index';

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label;

    prefabManager:GPrefabManager = null;
    pageManager:GPageManager = null;

    onLoad() {
        // init logic
        this.prefabManager = new GPrefabManager(() => {
            this.pageManager = new GPageManager(this.prefabManager, this.node);

            this.pageManager.openPage('Page_Main');
        });
    }
}
