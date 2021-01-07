import * as clientActions from '../actions/client';
import {REQUEST, SUCCESS, FAILURE} from '../actions/index';

const initialState= {
    token: null,
    isAuthenticated: false
};

const reducer = function clientReducer (state = initialState, action) {
  switch (action.type) {
    case clientActions.CLIENT_SET:
      return {
        token: action.token,
          isAuthenticated: true
      }

    case clientActions.CLIENT_UNSET:
      return {
        token: null,
          isAuthenticated: false
      }

    default:
      return state
  }
}

export default reducer
