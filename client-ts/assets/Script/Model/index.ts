import Base from './Base';
import User from './User';
import Level from './Level';
import Battle from './Battle';

class ModelProxy {
  static instance: ModelProxy = null;

  models: Array<Base> = [];

  constructor() {
    if(!ModelProxy.instance) {
      ModelProxy.instance = this;
    }

    return ModelProxy.instance;
  }

  registerModel = (model) => {
    this.models.push(model);

    return this;
  }

  onEffect = async (effectName, ...params) => {
    const [namespace, fName] = effectName.split('/');

    let result;

    for(let i = 0; i < this.models.length; i++) {
      const model = this.models[i];

      if(model.namespace === namespace) {
        result = await model.onEffect(fName, ...params);
      }
    };

    return result;
  }

  onAction = async (actionName, ...params) => {
    const [namespace, fName] = actionName.split('/');

    let result;

    this.models.forEach(async (model) => {
      if(model.namespace === namespace) {
        result = await model.onAction(fName, ...params);
      }
    });

    return result;
  }
}

export default new ModelProxy()
  .registerModel(new User())
  .registerModel(new Level())
  .registerModel(new Battle())
;