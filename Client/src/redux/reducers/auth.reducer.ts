/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthActionTypes } from "../actions/auth.actions";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  // error: string | null;
  error: any
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  error: null,
};

// export interface RootState {
//   auth: AuthState;
// }

const authReducer = (state = initialState, action: any): AuthState => {
  // console.log("action", action);
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        error: null,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
      };
    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload,
        error: null,
      };
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
      };
    case AuthActionTypes.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
