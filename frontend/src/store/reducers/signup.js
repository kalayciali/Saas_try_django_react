import {SIGNUP} from '../actions/signup';
import {REQUEST, SUCCESS, FAILURE} from '../actions/index';

const initialState = {  
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function signupReducer (state = initialState, action) {
  switch (action.type) {
    case SIGNUP[REQUEST]:
        return {
            requesting: true,
            successful: false,
            messages: [{ body: 'Signing up...', time: new Date() }],
            errors: [],
        }
    case SIGNUP[SUCCESS]:
          return {
                errors: [],
                messages: [{
                    body: `Successfully created account for ${action.response.data.email}`,
                    time: new Date(),
                }],
                requesting: false,
                successful: true,
            }
    case SIGNUP[FAILURE]:
          return {
                errors: state.errors.concat([{
                    body: action.response.message.toString(),
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
