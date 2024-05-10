/* eslint-disable @typescript-eslint/no-explicit-any */

export enum AuthActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
  CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR",
  LOGOUT = "LOGOUT"
}

export const AuthActionCreator = {
  loginRequest: (payload: { email: string, password: string }) => {
    return {
      type: AuthActionTypes.LOGIN_REQUEST,
      payload
    };
  },
  loginSuccess: (payload: {token: string}) => {
    return {
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload
    };
  },
  loginFailure: (payload: {error: string}) => {
    return {
      type: AuthActionTypes.LOGIN_FAILURE,
      payload
    };
  },
  registerRequest: (payload: {firstName:string, lastName:string, email: string, password: string }) => {
    return {
      type: AuthActionTypes.REGISTER_REQUEST,
      payload
    };
  },
  registerSuccess: (payload: {token: string}) => {
    return {
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload
    };
  },
  registerFailure: (payload: {error: string}) => {
    return {
      type: AuthActionTypes.REGISTER_FAILURE,
      payload
    };
  },
  clearAuthError: () => {
    return {
      type: AuthActionTypes.CLEAR_AUTH_ERROR,
    };
  },
  logout: ()=>{
    return {
      type: AuthActionTypes.LOGOUT
    };
  },
  
};
