import {applyMiddleware, compose, createStore} from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
      preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
