/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { AuthActionCreator } from "../actions/auth.actions";
import { AuthActionTypes } from "../actions/auth.actions";
import { IAuth } from "../../@types/authTypes";

const login = async (payload: { email: string; password: string }) => {
  console.log("in login api call");
  const data = await axios
    .post<IAuth>(
      "http://localhost:3300/auth/login",
      { email: payload.email, password: payload.password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("res........", res);
      return res;
    })
    .catch((err) => {
      console.log("err..........", err);
      return err.response;
    });

  return data;
};

const register = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  console.log("in register api call");
  const data = await axios
    .post<IAuth>(
      "http://localhost:3300/auth/register",
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("res........", res);
      return res;
    })
    .catch((err) => {
      console.log("err..........", err);
      return err;
    });

  return data;
};

const otpVerification = async (payload: { otp: string }) => {
  console.log("in Otp api call payload", payload);
  const token = localStorage.getItem('token');
  const data = await axios
    .post<IAuth>(
      "http://localhost:3300/user/verifyOtp",
      { otp: payload.otp},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("res........", res);
      return res;
    })
    .catch((err) => {
      
      console.log("err..........", err);
      return err.response;
    });
    console.log("Axi Data.....",data);
  return data;
};


// Sagassssssssssssssssssssssssssssssssssssssss


function* registerSaga(action: any): Generator<any, void, any> {
  try {
    console.log("register action...............", action);
    const response: any = yield call(register, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log("register response##################", response);
    yield put(
      AuthActionCreator.registerSuccess({
        token: response.data.token,
      })
    );
  } catch (error: any) {
    console.log("in catch", error);
    yield put(
      AuthActionCreator.registerFailure({
        error: error.message,
      })
    );
  }
}

function* loginSaga(action: any): Generator<any, void, any> {
  try {
    console.log("action...............", action);
    const response: any = yield call(login, {
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log("response##################", response);

    if (response.data.token) {
      yield put(
        AuthActionCreator.loginSuccess({
          token: response.data.token,
          // otp: response.data.OTP,
        })
      );
      
      const token = response.data.token;
      localStorage.setItem("token", token);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    // console.log("in catch")
    console.log("Error123456", error.message);
    yield put(
      AuthActionCreator.loginFailure(error.message)
    );
  }
}

function* OtpVerficationSaga(action: any): Generator<any, void, any> {
  try {
    console.log("action...............", action);
    const response: any = yield call(otpVerification, {
      otp: action.payload.otp,
    });
    console.log("response##################", response);
    if(response.data.otp){
      yield put(
        AuthActionCreator.otpVerificationSuccess()
      );
    }else{
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    // console.log("in catch")
    console.log("Error123456", error.message);
    yield put(
      AuthActionCreator.otpVerificationFailure(error.message)
    );
  }
}

function* authSaga() {
  console.log("asdasdd...................");
  yield takeLatest(AuthActionTypes.LOGIN_REQUEST, loginSaga);
  yield takeLatest(AuthActionTypes.REGISTER_REQUEST, registerSaga);
  yield takeLatest(AuthActionTypes.VERIFY_OTP_REQUEST, OtpVerficationSaga);
}

export default authSaga;
