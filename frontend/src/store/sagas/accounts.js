import * as api from '../api/accounts';
import { fork, call, put, takeLatest, take, cancel} from 'redux-saga/effects';
import * as accountActions from '../actions/accounts';
import {push} from 'connected-react-router';
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";
import {REQUEST} from '../actions/index';


// loginFlow needs to be written with take func 
// while(true) {
//      yield take('LOGIN')
//          perform login logic
//      yield take('LOGOUT')
//          perform logout logic
// }
export function* loginWorker(action) {
    const {userData, redirectTo} = action.payload
    const { response, auth_token, error } = yield call(api.login, userData, redirectTo)
    if (response) {
        api.setToken(auth_token)
        const { user, error} = yield call(api.getCurrentUser, redirectTo)
        if (error) {
            api.unsetCurrentUser()
        } else {
            api.setCurrentUser(user, redirectTo)
        }
    } else {
        api.unsetCurrentUser()
    }
}

function* authorize(user, password) {
    try {
        const token = yield call(api.authorize, user, password)
        yield put({type: success, token})
        yield call(Api.storeItem, {token})

    } catch(error) {
        yield put({type: fail, error})
    } finally {
        if (yield cancelled()) {
            // put special cancelling hereo
            // for example set isLoginPending = false
        }
    }
}

function* loginFlow() {
    while(true) {
        const {email, password, redirectTo} = yield take(accountActions.LOGIN)
        const task = yield fork(authorize, user, password)
        const action = yield take([logout, login_error])
        if (action.type == logout)
            yield cancel(task)
        yield call(api.clearItem, 'token')
    }
}


export function* logoutWorker() {
    const { response, error } = yield call(api.logout)
    if (response) {
        api.unsetCurrentUser()
        yield call(push, '/')
    } else {
        api.unsetCurrentUser()
    }
}

export function* watchLogin() {
    yield takeLatest(accountActions.LOGIN, loginWorker)
}

export function* watchLogout() {
    yield takeLatest(accountActions.LOGOUT, logoutWorker)
}


