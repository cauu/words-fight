function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }

  return new Observer(value);
}

function defineReactive(obj: Observer, key: string, val: any) {
  const dep = new Dep();
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => val,
    set: newVal => {
      let value = val;
      if (newVal === value) {
        return
      }
      val = newVal;
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

class Observer {
  value: any;
  dep: Dep;
  constructor(value: any) {
    this.value = value
    this.walk(value);
  }

  walk(value) {
    Object.keys(value).map((k) => {
      this.convert(k, value[k]);
    });
  }

  convert(key, val) {
    defineReactive(this.value, key, val);
  }
}

class Dep {
  subs = [];
  constructor() {
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class BaseModel {
  namespace = '';

  // state更新后，会触发observer函数，notify所有listener
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