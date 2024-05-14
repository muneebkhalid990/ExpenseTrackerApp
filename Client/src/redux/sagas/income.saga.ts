/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { IncomeActionCreator } from "../actions/income.actions";
import { IncomeActionTypes } from "../actions/income.actions";
import { IAuth } from "../../@types/authTypes";

const incomeFetch = async () => {
    // console.log("in income api call")
    const token = localStorage.getItem('token');
    const data = await axios.get(
        "http://localhost:3300/income",
        // {income: payload.income},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true,
        }
    ).then((res) => {
        console.log("res........", res);
        return res
    }).catch((err) => {
        console.log("err..........", err)
        return err
    })

    return data
}

const incomeAdd = async (payload: { title: string, amount: number, category: string, description: string }) => {
    // console.log("in income api call")
    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await axios.post<IAuth>(
        "http://localhost:3300/income",
        { title: payload.title, amount: payload.amount, category: payload.category, description: payload.description },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true,
        }
    ).then((res) => {
        console.log("res........", res);
        return res
    }).catch((err) => {
        console.log("err..........", err)
        return err
    })

    return data
}

const incomeEdit = async (payload: { id: number, title: string, amount: number, category: string, description: string }) => {
    // console.log("in income api call")
    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await axios.put<IAuth>(
        `http://localhost:3300/income/${payload.id}`,
        { id: payload.id, title: payload.title, amount: payload.amount, category: payload.category, description: payload.description },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true,
        }
    ).then((res) => {
        console.log("res........", res);
        return res
    }).catch((err) => {
        console.log("err..........", err)
        return err
    })

    return data
}


const incomeDelete = async (payload: { id: number, title: string, amount: number, category: string, description: string }) => {
    console.log("in income api call")
    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await axios.delete<IAuth>(
        `http://localhost:3300/income/${payload.id}`,
        // { id: payload.id},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                id: payload.id,
            },
            withCredentials: true,
        }
    ).then((res) => {
        
        console.log("res...6345453...", res);
        return { id: payload.id, data: res.data };
    }).catch((err) => {
        console.log("err..........", err)
        return err
    })
    // console.log("Data...45656....",data);
    return data
}

function* incomeAddSaga(action: any): Generator<any, void, any> {
    try {
        // console.log("action...............", action)
        const response: any = yield call(incomeAdd, {
            title: action.payload.title,
            amount: action.payload.amount,
            category: action.payload.category,
            description: action.payload.description,
        })
        console.log("Add Income response##################", response)
        yield put(
            IncomeActionCreator.addIncomeSuccess({
                id: response.data.resData.id,
                title: response.data.resData.title,
                amount: response.data.resData.amount,
                category: response.data.resData.category,
                description: response.data.resData.description,
            })
        );
    } catch (error: any) {
        // console.log("in catch")
        yield put(
            IncomeActionCreator.addIncomeFailure({
                error: error.message,
            })
        )

    }
}

function* incomeFetchSaga(action: any): Generator<any, void, any> {
    try {
        // console.log("action...............", action)
        const response: any = yield call(incomeFetch)
        // console.log("response##################", response)
        yield put(
            IncomeActionCreator.incomeSuccess({
                incomes: response.data.incomes
            })
        );
    } catch (error: any) {
        // console.log("in catch")
        yield put(
            IncomeActionCreator.incomeFailure({
                error: error.message,
            })
        )

    }
}

function* incomeEditSaga(action: any): Generator<any, void, any> {
    try {
        console.log("action...............", action)
        const response: any = yield call(incomeEdit, {
            id: action.payload.id,
            title: action.payload.title,
            amount: action.payload.amount,
            category: action.payload.category,
            description: action.payload.description,
        })
        console.log("Income Edit response##################", response)
        yield put(
            IncomeActionCreator.editIncomeSuccess(response.data.income)
        );
    } catch (error: any) {
        console.log("in catch")
        yield put(
            IncomeActionCreator.editIncomeFailure({
                error: error.message,
            })
        )

    }
}

function* incomeDeleteSaga(action: any): Generator<any, void, any> {
    try {
        console.log("action...............", action)
        const response: any = yield call(incomeDelete, {
            id: action.payload.id,
            title: action.payload.title,
            amount: action.payload.amount,
            category: action.payload.category,
            description: action.payload.description,
        })
        console.log("response##################", response)
        yield put(
            IncomeActionCreator.deleteIncomeSuccess(response.id)
        );
    } catch (error: any) {
        console.log("in catch")
        yield put(
            IncomeActionCreator.deleteIncomeFailure({
                error: error.message,
            })
        )

    }
}

function* incomeSaga() {
    // console.log("asdasdd...................")
    yield takeLatest(IncomeActionTypes.INCOME_REQUEST, incomeFetchSaga);
    yield takeLatest(IncomeActionTypes.ADD_INCOME_REQUEST, incomeAddSaga);
    yield takeLatest(IncomeActionTypes.EDIT_INCOME_REQUEST, incomeEditSaga);
    yield takeLatest(IncomeActionTypes.DELETE_INCOME_REQUEST, incomeDeleteSaga);
}

export default incomeSaga;