import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import apiMiddleware from '../middlewares/api'

export default function configureStore(preloadedState) {
  return (
    rootReducer,
    preloadedState,
    applyMiddleware(apiMiddleware, thunk)
  );
}