import { QueueingSubject } from 'queueing-subject';
import ws from 'rxjs-websockets';

import API from '../Constant/Api';
import BaseModel from './Base';

/**
 * @todo 
 * 增加update和observer，当模型改变时，会自动触发监听函数
 */
class Battle extends BaseModel {
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

      this.messages = connection.messages;
      this.connectionStatus = connection.connectionStatus;

      const messagesSubscription = this.messages.subscribe((message:Blob) => {
        const read = new FileReader();
        read.readAsText(message);
        read.onload = function() {
          /**
           * @todo 
           * 当收到消息的时候，触发更新函数，更新battle模型
           * 并通知界面触发相应的变化
           */
          try {
            console.log(JSON.parse(read.result));
          } catch(e) {
            console.log(e);
          }
        };
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
      const [uid] = params;
      if(this.input) {
        this.input.next(JSON.stringify({
          BattleInit: {
            Uid: uid
          }
        }));
      }
    },
    async joinBattle(...params) {
      const [user, bid] = params;

      if(this.input) {
        this.input.next(JSON.stringify({
          JoinBattle: {
            User: user,
            Bid: bid
          }
        }));
      }
    }
  };

  actions = {
    test() {
    }
  }
}

export default Battle;