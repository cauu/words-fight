import React from 'react';
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import * as Fetch from "../utils/fetch";

class Notify {
  constructor(root) {
    if (!root) {
      const rootExist = document.getElementsByClassName('notifucation-container')[0];
      root = rootExist || document.createElement('div');
      root.className = 'notifucation-container';
      document.body.appendChild(root);
    }
    this.notifyInstance = ReactDOM.render(<NotificationSystem allowHTML={true} />, root);
  }

  error(title, err) {
    let errorMessage = '';
    if (typeof error === 'string') {
      errorMessage = err;
    } else if (err instanceof Error) {
      errorMessage = err.name + ': ' + err.message;
    }
    this.notifyInstance.addNotification({
      title,
      errorMessage,
      level: 'error',
      position: 'tr'
    });
  }

  success(title, message) {
    this.notifyInstance.addNotification({
      title,
      message,
      level: 'success',
      position: 'tr'
    });
  }

  warning(title, message) {
    this.notifyInstance.addNotification({
      title,
      message,
      level: 'warning',
      position: 'tr'
    });
  }

  info(title, message) {
    this.notifyInstance.addNotification({
      title,
      message,
      level: 'info',
      position: 'tr'
    });
  }

  confirm(message, confirmCallback) {
    this.notifyInstance.addNotification({
      title: '',
      message: message,
      level: 'warning',
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: '确定',
        callback: () => {
          confirmCallback();
        }
      }
    });
  }
};

class FetchWithPopover {
  constructor() {
    this.notifyInstance = new Notify();
  }

  send(config={
    method: 'Get',
    url: '',
    params: {},
    cookie: false
  }) {
    let requestDefer;
    switch (config.method.toUpperCase()) {
      case 'GET':
        requestDefer = Fetch.Get(config.url);
        break;
      case 'POST':
        requestDefer = Fetch.Post(config.url, config.params);
        break;
      case 'DELETE':
        requestDefer = Fetch.Delete(config.url);
        break;
    }
    return requestDefer
      .then((response) => {
        let code = parseInt(response.code);
        if (code === 0) {
          return response;
        } else if (code === 4) {
          window.location.href = '/';
        } else {
          this.notifyInstance.error('请求失败', response.message);
        }
      })
      .catch((error) => {
        debugger;
        this.notifyInstance.error('内部错误', error);
      })
  }
};

export {
  Notify,
  FetchWithPopover
}
