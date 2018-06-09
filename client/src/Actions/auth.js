import axios from "axios";

const ROOT_URL = "http://localhost:8000/api";

export const USER_REGISTERED = "USER_REGISTERED";
export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const signup = (username, email, password, history) => {
  return dispatch => {
    console.log("action signup called");
    axios
      .post(`${ROOT_URL}/signup`, { username, email, password, history })
      .then(res => {
        console.log("res.data.message", res.data.message);
        dispatch({
          type: USER_REGISTERED
        });
        history.push("/login");
      })
      .catch(error => {
        console.log("error", error);
        dispatch(authError(error.response.data.error));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then(res => {
        console.log("res", res);
        dispatch({
          type: USER_AUTHENTICATED
        });
        history.push("/home");
      })
      .catch(error => {
        console.log("error", error);
        dispatch(authError(error.response.data.error));
      });
  };
};

export const signout = history => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/signout`, { history })
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
