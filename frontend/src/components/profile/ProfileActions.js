import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_PROFILE, ADD_PROFILE } from "./ProfileTypes";

export const getProfile = () => dispatch => {
    axios.get("/api/v1/profile/")
        .then(response => {
            dispatch({
                type:GET_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const addProfile = profile => dispatch => {
    axios.post("/api/v1/profile/", profile)
        .then(response => {
            dispatch({
                type: ADD_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};
