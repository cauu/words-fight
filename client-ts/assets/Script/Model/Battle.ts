import { QueueingSubject } from 'queueing-subject';
import ws from 'rxjs-websockets';

import API from '../Constant/Api';
import BaseModal from './Base';

class Battle extends BaseModal {
  namespace = 'battle';
  input = null;
  connection = null;
  connectionStatus = null;
  messages = null;

  constructor() {
    super();
  }

  state = {
  };

  effects = {
    createConnection() {
      if(!!this.connection) return Promise.reject('Connection exist!');

      this.input = new QueueingSubject<string>();

      const connection = ws(API.BATTLE_WS, this.input); 
      console.log(connection);

      this.messages = connection.messages;
      this.connectionStatus = connection.connectionStatus;

      const messagesSubscription = this.messages.subscribe((message: string) => {
        console.log('[MSG]', message);
      });

      return new Promise((resolve, reject) => {
        const connectionStatusSubscription = this.connectionStatus.subscribe((numberConnected, err) => {
          if(numberConnected > 0) {
            resolve();
          }
        });

        if(connectionStatusSubscription.type === 'error') {
          reject('error');
        }
      });
    },
    closeConnection() {
      this.messages && this.messages.unsubscribe();

      this.connectionStatus && this.connectionStatus.unsubscribe();

      this.connection = null;
    },
    async initBattle(...params) {
      console.log('params', params);
      if(this.input) {
        this.input.next('test');
      }
    }
  };

  actions = {
    test() {
    }
  }
}

export default Battle;