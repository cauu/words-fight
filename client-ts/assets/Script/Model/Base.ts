class BaseModel {
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

  onEffect = async (effectName) => {
    this.effects[effectName] && this.effects[effectName]();
  }

  onAction = (actionName) => {
    this.actions[actionName] && this.actions[actionName]();
  }
}

export default BaseModel;