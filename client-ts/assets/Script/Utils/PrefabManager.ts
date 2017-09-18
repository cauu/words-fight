class GPrefabManager {
  static instance: GPrefabManager = null;

  static resPath = [
    'Page'
  ];

  _prefabs = {};

  constructor(cb) {
    if(!GPrefabManager.instance) {
      GPrefabManager.resPath.forEach((path, index) => {
        cc.loader.loadResDir(path, (err, prefabs) => {
          if(prefabs) {
            prefabs.forEach((prefab) => {
              this._prefabs[prefab.name] = prefab;
            });
          } else {
            cc.error(err);
          }

          cb && cb();
        });
      });

      GPrefabManager.instance = this;
    } else {
      cb && cb();
    }
    
    return GPrefabManager.instance;
  }

  getPrefab(path) {
    return this._prefabs[path];
  }
}

export default GPrefabManager;