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

export const signup = (username, email, password) => {
  return dispatch => {
    console.log("action signup called");
    axios
      .post(`${ROOT_URL}/signup`, { username, email, password })
      .then(res => {
        console.log("res", res);
        dispatch({
          type: USER_REGISTERED
        });
      })
      .catch(error => {
        console.log("err", error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  };
};

// export const signin = (username, password, history) => {
//   console.log("history", history);
//   return dispatch => {
//     axios
//       .post(`${ROOT_URL}/signin`, { username, password })
//       .then(res => {
//         dispatch({
//           type: USER_AUTHENTICATED
//         });
//         history.push("/home");
//       })
//       .catch(() => {
//         dispatch(authError("Incorrect email/password combo"));
//       });
//   };
// };

// export const signout = history => {
//   return dispatch => {
//     axios
//       .post(`${ROOT_URL}/signout`, { history })
//       .then(() => {
//         dispatch({
//           type: USER_UNAUTHENTICATED
//         });
//         history.push("/");
//       })
//       .catch(() => {
//         dispatch(authError("Failed to log you out"));
//       });
//   };
// };
