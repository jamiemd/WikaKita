import {
  USER_REGISTERED,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR
} from "../Actions/auth";

export default (
  auth = {
    isAuthenticated: localStorage.getItem("id_token") ? true : false
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTERED:
      return { ...auth, registered: true };
    case USER_AUTHENTICATED:
      return { ...auth, isAuthenticated: true };
    case USER_UNAUTHENTICATED:
      return { ...auth, isAuthenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };
    default:
      return auth;
  }
};
