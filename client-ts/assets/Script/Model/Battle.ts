import { QueueingSubject } from 'queueing-subject';
import ws from 'rxjs-websockets';

import API from '../Constant/Api';
import BaseModal from './Base';

class Battle extends BaseModal {
  namespace = 'battle';
  connection = null;
  input = null;

  constructor() {
    super();
  }

  state = {
  };

  effects = {
    createConnection() {
      this.input = new QueueingSubject<string>();

      const { messages, connectionStatus } = ws(API.BATTLE_WS, this.input);
      console.log('connect', messages, connectionStatus);

      return new Promise((resolve, reject) => {
        resolve('result: 123');
      });
    },
    closeConnection() {
    },
    async initBattle(...params) {
      console.log('params', params);
      if(this.input) {
        this.input.next('test');
      }
    }
  };

  actions = {
  }
}

export default Battle;