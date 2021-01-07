
import {createAction, createRequestTypes} from './index';
import {REQUEST, SUCCESS, FAILURE} from './index';

export const LOGIN = createRequestTypes('LOGIN')

export const loginActions = {
    request: (email, password, redirectTo) => createAction(LOGIN[REQUEST], {email, password, redirectTo}),
    success: (response) => createAction(LOGIN[SUCCESS], {response}),
    failure: (response) => createAction(LOGIN[FAILURE], {response}),
}
