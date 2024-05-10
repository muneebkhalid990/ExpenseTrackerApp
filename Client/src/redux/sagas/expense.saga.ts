/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { call , put , takeLatest } from "redux-saga/effects";
import { ExpenseActionCreator, ExpenseActionTypes } from "../actions/expense.actions";
import { IAuth } from "../../@types/authTypes";


const expenseFetch = async () => {
    // console.log("in income api call")
    const token = localStorage.getItem('token');
    const data = await axios.get(
        "http://localhost:3300/expenses",
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

const expenseAdd = async (payload: { title: string, amount: number, category: string, description: string }) => {
    // console.log("in income api call")
    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await axios.post<IAuth>(
        "http://localhost:3300/expenses",
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

const expenseEdit = async (payload: { id: number, title: string, amount: number, category: string, description: string }) => {
    // console.log("in income api call")
    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await axios.put<IAuth>(
        `http://localhost:3300/expenses/${payload.id}`,
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

const expenseDelete = async (payload: { id: number, title: string, amount: number, category: string, description: string }) => {
    console.log("in income api call")
    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await axios.delete<IAuth>(
        `http://localhost:3300/expenses/${payload.id}`,
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



// Generator Functions

function* expenseFetchSaga(action: any): Generator<any, void, any> {
    try {
        // console.log("action...............", action)
        const response: any = yield call(expenseFetch)
        // console.log("response##################", response)
        yield put(
            ExpenseActionCreator.expenseSuccess({
                expenses: response.data.expenses
            })
        );
    } catch (error: any) {
        // console.log("in catch")
        yield put(
            ExpenseActionCreator.expenseFailure({
                error: error.message,
            })
        )

    }
}

function* expenseAddSaga(action: any): Generator<any, void, any> {
    try {
        // console.log("action...............", action)
        const response: any = yield call(expenseAdd, {
            title: action.payload.title,
            amount: action.payload.amount,
            category: action.payload.category,
            description: action.payload.description,
        })
        console.log(" Expense Add response##################", response)
        yield put(
            ExpenseActionCreator.addExpenseSuccess({
                title: response.data.resData.title,
                amount: response.data.resData.amount,
                category: response.data.resData.category,
                description: response.data.resData.description,
            })
        );
    } catch (error: any) {
        // console.log("in catch")
        yield put(
            ExpenseActionCreator.addExpenseFailure({
                error: error.message,
            })
        )

    }
}

function* expenseEditSaga(action: any): Generator<any, void, any> {
    try {
        console.log("action...............", action)
        const response: any = yield call(expenseEdit, {
            id: action.payload.id,
            title: action.payload.title,
            amount: action.payload.amount,
            category: action.payload.category,
            description: action.payload.description,
        })
        console.log("response##################", response)
        yield put(
            ExpenseActionCreator.editExpenseSuccess(response.data.expense)
        );
    } catch (error: any) {
        console.log("in catch")
        yield put(
            ExpenseActionCreator.editExpenseFailure({
                error: error.message,
            })
        )

    }
}

function* expenseDeleteSaga(action: any): Generator<any, void, any> {
    try {
        console.log("action...............", action)
        const response: any = yield call(expenseDelete, {
            id: action.payload.id,
            title: action.payload.title,
            amount: action.payload.amount,
            category: action.payload.category,
            description: action.payload.description,
        })
        console.log("response##################", response)
        yield put(
            ExpenseActionCreator.deleteExpenseSuccess(response.id)
        );
    } catch (error: any) {
        console.log("in catch")
        yield put(
            ExpenseActionCreator.deleteExpenseFailure({
                error: error.message,
            })
        )

    }
}

function* expenseSaga() {
    // console.log("asdasdd...................")
    yield takeLatest(ExpenseActionTypes.EXPENSE_REQUEST, expenseFetchSaga);
    yield takeLatest(ExpenseActionTypes.ADD_EXPENSE_REQUEST, expenseAddSaga);
    yield takeLatest(ExpenseActionTypes.EDIT_EXPENSE_REQUEST, expenseEditSaga);
    yield takeLatest(ExpenseActionTypes.DELETE_EXPENSE_REQUEST, expenseDeleteSaga);
}

export default expenseSaga;