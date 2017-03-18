import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(apiMiddleware, thunk)
  );

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
}