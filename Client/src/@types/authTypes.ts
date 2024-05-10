/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthActionTypes } from "../redux/actions/auth.actions";
  
  export interface IAuth {
    token: string;
  }
  
  
  
  // export interface AuthState {
  //   pending: boolean;
  //   token: string;
  //   error: string | null;
  // }
  
  // export interface LoginPayload {
  //   values: { email: string, password: string };
  //   callback: any;
  // }
  
  // export interface LoginSuccessPayload {
  //   token: string;
  // }
  
  // export interface LoginFailurePayload {
  //   error: string;
  // }
  
  // export interface RegisterSuccessPayload {
  //   token: string;
  // }
  
  // export interface RegisterFailurePayload {
  //   error: string;
  // }
  
  // export interface LoginRequest {
  //   type: typeof AuthActionTypes.LOGIN_REQUEST;
  //   payload: LoginPayload;
  // }
  
  // export type LoginSuccess = {
  //   type: typeof AuthActionTypes.LOGIN_SUCCESS,
  //   payload: LoginSuccessPayload,
  // };
  
  // export type LoginFailure = {
  //   type: typeof AuthActionTypes.LOGIN_FAILURE,
  //   payload: LoginFailurePayload,
  // };
  
  // export interface RegisterPayload {
  //   values: { email: string, password: string };
  //   callback: any;
  // }
  
  // export interface RegisterRequest {
  //   type: typeof AuthActionTypes.REGISTER_REQUEST;
  //   payload: RegisterPayload;
  // }
  
  // export type RegisterSuccess = {
  //   type: typeof AuthActionTypes.REGISTER_SUCCESS,
  //   payload: RegisterSuccessPayload,
  // };
  
  // export type RegisterFailure = {
  //   type: typeof AuthActionTypes.REGISTER_FAILURE,
  //   payload: RegisterFailurePayload,
  // };
  
  // export type AuthActions =
  //   | LoginRequest
  //   | LoginSuccess
  //   | LoginFailure
  //   | RegisterFailure
  //   | RegisterSuccess
  //   | RegisterRequest;