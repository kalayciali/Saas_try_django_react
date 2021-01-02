import { GET_PROFILE, ADD_PROFILE } from "./ProfileTypes";

const initialState = {
    profile: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case ADD_PROFILE:
            return {
                ...state,
                profile: action.payload 
            }
        default:
            return state;
    }
}
