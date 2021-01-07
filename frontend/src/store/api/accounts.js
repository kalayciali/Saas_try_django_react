import axios from "axios";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";

const BASE_URL = "/api/v1/";

export const login = async(email, password) => {
    try {
        const response = await axios.post(BASE_URL + "token/login/", {email, password})
        return response.data
    } catch(error) {
        throw error
    }
}

export const getCurrentUser= async() => {
    try{
        const response = await axios.get(BASE_URL + "users/me/")
        return response.data
    } catch(error) {
            throw error
        }
}


export const signupUser = async(email, username, password) => {
    try {
        const response = await axios.post(BASE_URL + 'users/', {email, username, password})
        return response
    } catch(error) {
        throw error
    }
}

export const logout = async () => {
    try{
        const response = await axios.post(BASE_URL + "token/logout/")
        return response.data
    } catch(error) {
            throw error
        }
}

// helper functions //
export function setCurrentUser (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
};

export function setToken(token){
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
}

export function unsetCurrentUser() {
    setAxiosAuthToken("")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}
