import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { profileReducer } from "./components/profile/.ProfileReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        createUser: signupReducer,
        auth: loginReducer,
        profile: profileReducer
    });

export default createRootReducer;
