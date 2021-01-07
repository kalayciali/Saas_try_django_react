import {createAction, createRequestTypes} from './index';
import {REQUEST, SUCCESS, FAILURE} from './index';

export const SIGNUP = createRequestTypes('SIGNUP');

export const signupActions = {
    request: (email, username, password) => createAction(SIGNUP[REQUEST], {email, username, password}),
    success: (response) => createAction(SIGNUP[SUCCESS], {response}),
    failure: (response) => createAction(SIGNUP[FAILURE], {response}),
};

