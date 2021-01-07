import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";
import {push} from 'connected-react-router';

import * as loginActions from '../actions/login';
import * as clientActions from '../actions/client';
import * as api from '../api/accounts';
import {fetchEntity} from './index';
import {REQUEST, FAILURE} from '../actions/index';

function* loginFlow(email, password) {
    try {
        const token = yield call(api.login, email, password)
        const {auth_token} = token;
        api.setToken(auth_token)
        yield put(clientActions.clientActions.set(auth_token))
        const usernameEmail = yield call(api.getCurrentUser)
        api.setCurrentUser(usernameEmail)

        yield put(loginActions.loginActions.success(auth_token))

        yield put(push('/dashboard'))

    } catch(error) {
        yield put(loginActions.loginActions.failure(error))
    } finally {
        if (yield cancelled()) {
            yield put(push('/login'))
        }
    }
}

function* logout() {
    yield put(clientActions.clientActions.unset())
    api.unsetCurrentUser()
    yield put(push('/'))
}

function* loginWatcher() {

    while(true) {
        const {email, password, redirectTo}= yield take(loginActions.LOGIN[REQUEST])
        const task = yield fork(loginFlow, email, password)
        const action = yield take([clientActions.CLIENT_UNSET, loginActions.LOGIN[FAILURE]])
        if (action.type == clientActions.CLIENT_UNSET)
            yield cancel(task)
        yield call(logout)
    }
}

export default loginWatcher

