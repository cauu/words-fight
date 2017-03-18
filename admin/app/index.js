import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import Routers from './routes';
import createStore from './store';

class Root extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={ store }>
        <Routers history={ history } />
      </Provider>
    );
  }
}

const initialState = {};

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const store = createStore(initialState);

render(
  <Root store={ store } history={ appHistory } />,
  document.getElementById('root')
);