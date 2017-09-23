import GPrefabManager from '../Utils/PrefabManager';

const { ccclass, property } = cc._decorator;

let instance:GPageManager = null;

class GPageManager {
  _prefabManager: GPrefabManager = null;

  _node = null;

  _pages = {};

  constructor(prefabManager: GPrefabManager, node) {
    if(!instance) {
      instance = this;
      
      this._node = node;
      this._prefabManager = prefabManager;
    }

    return instance;
  }

  getPage = (pageName) => {
    console.log(this._prefabManager.getPrefab('Page_Game'));
    return this._prefabManager.getPrefab(pageName);
  }

  openPage = (pageName) => {
    const prefab = this.getPage(pageName);
    console.log(pageName, prefab);

    const page = cc.instantiate(prefab);
    page.parent = this._node;
    this._pages[pageName] = page.getComponent(pageName);
  }

  closePage = (pageName) => {
    const page = this._pages[pageName];
    this._pages[pageName] = null;

    if(!page) return;

    page.node.destroy();
  }

  closeAll = () => {
    const keys = Object.keys(this._pages);

    keys.forEach(this.closePage);

    this._pages = {};
  }
}

export default GPageManager;