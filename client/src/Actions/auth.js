import axios from "axios";

const ROOT_URL = "http://localhost:8000/api";

export const USER_REGISTERED = "USER_REGISTERED";
export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const CHECK_IF_AUTHENTICATED = "CHECK_IF_AUTHENTICATED";

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const signup = (username, email, password) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/signup`, { username, email, password })
      .then(res => {
        dispatch({
          type: USER_REGISTERED
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(authError("Failed to register user"));
      });
  };
};

export const signin = (username, password, history) => {
  console.log("history", history);
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then(res => {
        dispatch({
          type: USER_AUTHENTICATED
        });
        history.push("/home");
      })
      .catch(() => {
        dispatch(authError("Incorrect email/password combo"));
      });
  };
};

export const signout = history => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/logout`, { history })
      .then(() => {
        dispatch({
          type: USER_UNAUTHENTICATED
        });
        history.push("/");
      })
      .catch(() => {
        dispatch(authError("Failed to log you out"));
      });
  };
};
