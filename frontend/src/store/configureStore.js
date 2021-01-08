import {applyMiddleware, compose, createStore} from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { Provider } from "react-redux";

import createRootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';


const Root = ({ children, initialState = {} }) => {
    const history = createBrowserHistory()
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [sagaMiddleware, routerMiddleware(history)]
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );

    sagaMiddleware.run(rootSaga);
    
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </Provider>
    )
}

export default Root
