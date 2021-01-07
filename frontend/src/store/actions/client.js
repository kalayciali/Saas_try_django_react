import {createAction, createRequestTypes} from './index';

export const CLIENT_SET = 'CLIENT_SET'  
export const CLIENT_UNSET = 'CLIENT_UNSET'  

export const clientActions = {
    set: (token) => createAction(CLIENT_SET, {token}),
    unset: () => createAction(CLIENT_UNSET, {}),
}

