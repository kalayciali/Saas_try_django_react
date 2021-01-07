import { take, fork, cancel} from 'redux-saga/effects'
import * as signupActions from '../actions/signup';
import * as api from '../api/accounts';
import {fetchEntity} from './index';

import {REQUEST} from '../actions/index';


// create api request object

function* signupFlow(email, username, password) {
    const request = () => api.signupUser(email, username, password)
    yield fetchEntity(request, signupActions.signupActions);
}

function* signupWatcher() {
    let lastTask
    while (true) {
        const action = yield take(signupActions.SIGNUP[REQUEST])
        if (lastTask) {
            yield cancel(lastTask)
        }

        console.log(action)
        const {email, username, password} = action
        lastTask = yield fork(signupFlow, email, username, password);
    }
}

export default signupWatcher

