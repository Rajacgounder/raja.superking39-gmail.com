import { actionTypes } from "react-redux-firebase";

const initialState = {
  authError: null,
  superVisorAuth: [],
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        authError: null,
      };
    case "LOGIN_ERROR":
      console.log("Login failed", payload);
      return {
        ...state,
        authError: payload.message,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: payload.message,
      };
    case "LOGIN_SUCCESS_SUPER_VISOR":
      return {
        ...state,
        superVisorAuth: payload,
      };
    case "LOGIN_FAILURE_SUPER_VISOR":
      return {
        ...state,
        authError: "Wrong email/password",
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signout success");
      localStorage.setItem("superVisorAuth", null);
      return {
        ...state,
        superVisorAuth: [],
      };
    default:
      return state;
  }
};

export default authReducer;
