import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import client from './client';
import signup from './signup';
import login from './login';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    signup,
    client, // it will create client: client
    login,

})

export default createRootReducer
