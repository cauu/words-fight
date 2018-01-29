class BaseModel {
  namespace = '';

  state = {};

  effects = {};

  actions = {};

  constructor() {
  }

  setState(obj) {
    this.state = {
      ...this.state,
      ...obj
    };
  }

  onEffect = async (effectName, ...params) => {
    if(this.effects[effectName]) {
      return await this.effects[effectName].call(this, ...params);
    }
  }

  onAction = (actionName, ...params) => {
    return this.actions[actionName] && this.actions[actionName].call(this, ...params);
  }
}

export default BaseModel;