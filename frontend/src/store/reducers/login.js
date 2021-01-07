import {LOGIN} from '../actions/login';
import {REQUEST, SUCCESS, FAILURE} from '../actions/index';

const initialState = {  
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN[REQUEST]:
        return {
            requesting: true,
            successful: false,
            messages: [{ body: 'Logging in...', time: new Date() }],
            errors: [],
        }
    case LOGIN[SUCCESS]:
          return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }
    case LOGIN[FAILURE]:
          return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }

    default:
    return state
    }
}

export default reducer

