import axios from "axios";
import { toast } from "react-toastify";
import { isEmpty } from "../../utils/Utils";
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS
} from "./SignupTypes";

export const signupNewUser = userData => dispatch => {
    dispatch({ type: CREATE_USER_SUBMITTED }); // set submitted state
    axios.
        post("/api/v1/users/", userData).
        then(response => {
            toast.success(
            "Account for " + userData.username + " created successfully."
            );
            dispatch({ type: CREATE_USER_SUCCESS });
        })
        .catch(error => {
            if (error.response) {
                // the request was made but response status code
                // fall beyond 2xx
                toast.error(JSON.stringify(error.response.data));
                dispatch({
                    type: CREATE_USER_ERROR,
                    errorData: error.response.data
                });
            } else if (error.message) {
                // there is message just show it
                toast.error(JSON.stringify(error.message));
            } else {
                // we got strange error just show it
                toast.error(JSON.stringify(error));
            }
        });
};
