/* eslint-disable @typescript-eslint/no-explicit-any */

export enum AuthActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
  CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR",
  VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST",
  VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE",
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
  otpVerificationRequest: ( payload: {otp: string }) => {
    return {
      type: AuthActionTypes.VERIFY_OTP_REQUEST,
      payload
    };
  },
  otpVerificationSuccess: () => {
    return {
      type: AuthActionTypes.VERIFY_OTP_SUCCESS,
    };
  },
  otpVerificationFailure: (payload: {error: string}) => {
    return {
      type: AuthActionTypes.VERIFY_OTP_FAILURE,
      payload
    };
  },
  logout: ()=>{
    return {
      type: AuthActionTypes.LOGOUT
    };
  },
  
};
