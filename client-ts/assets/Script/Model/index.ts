import Base from './Base';
import User from './User';
import Level from './Level';

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

  onEffect = (effectName) => {
    this.models.forEach((model) => {
      model.onEffect(effectName);
    });

    return this;
  }

  onAction = (actionName) => {
    this.models.forEach((model) => {
      model.onAction(actionName);
    });

    return this;
  }
}

export default new ModelProxy()
  .registerModel(new User())
  .registerModel(new Level())
;