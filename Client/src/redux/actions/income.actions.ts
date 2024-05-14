/* eslint-disable @typescript-eslint/no-explicit-any */
export enum IncomeActionTypes {
  INCOME_REQUEST = "INCOME_REQUEST",
  INCOME_SUCCESS = "INCOME_SUCCESS",
  INCOME_FAILURE = "INCOME_FAILURE",
  EDIT_INCOME_REQUEST = "EDIT_INCOME_REQUEST",
  EDIT_INCOME_SUCCESS = "EDIT_INCOME_SUCCESS",
  EDIT_INCOME_FAILURE = "EDIT_INCOME_FAILURE",
  ADD_INCOME_REQUEST = "ADD_INCOME_REQUEST",
  ADD_INCOME_SUCCESS = "ADD_INCOME_SUCCESS",
  ADD_INCOME_FAILURE = "ADD_INCOME_FAILURE",
  DELETE_INCOME_REQUEST = "DELETE_INCOME_REQUEST",
  DELETE_INCOME_SUCCESS = "DELETE_INCOME_SUCCESS",
  DELETE_INCOME_FAILURE = "DELETE_INCOME_FAILURE",
}

export const IncomeActionCreator = {
  incomeRequest: () => {
    return {
      type: IncomeActionTypes.INCOME_REQUEST,
    };
  },
  incomeSuccess: (payload: { incomes: any }) => {
    return {
      type: IncomeActionTypes.INCOME_SUCCESS,
      payload
    };
  },
  incomeFailure: (payload: { error: string }) => {
    return {
      type: IncomeActionTypes.INCOME_FAILURE,
      payload
    };
  },
  editIncomeRequest: (payload: { id: number, title: string, amount: number, category: string, description: string }) => {
    return {
      type: IncomeActionTypes.EDIT_INCOME_REQUEST,
      payload
    };
  },
  editIncomeSuccess: (payload: any) => {
    return {
      type: IncomeActionTypes.EDIT_INCOME_SUCCESS,
      payload
    };
  },
  editIncomeFailure: (payload: { error: string }) => {
    return {
      type: IncomeActionTypes.EDIT_INCOME_FAILURE,
      payload
    };
  },
  addIncomeRequest: (payload: { title: string, amount: number, category: string, description: string }) => {
    return {
      type: IncomeActionTypes.ADD_INCOME_REQUEST,
      payload
    };
  },
  addIncomeSuccess: (payload: {id:number, title: string, amount: number, category: string, description: string }) => {
    return {
      type: IncomeActionTypes.ADD_INCOME_SUCCESS,
      payload
    };
  },
  addIncomeFailure: (payload: { error: string }) => {
    return {
      type: IncomeActionTypes.ADD_INCOME_FAILURE,
      payload
    };
  },
  deleteIncomeRequest: (payload: { id: number, title: string, amount: number, category: string, description: string }) => {
    return {
      type: IncomeActionTypes.DELETE_INCOME_REQUEST,
      payload
    };
  },
  deleteIncomeSuccess: (payload: any) => {
    return {
      type: IncomeActionTypes.DELETE_INCOME_SUCCESS,
      payload
    };
  },
  deleteIncomeFailure: (payload: { error: string }) => {
    return {
      type: IncomeActionTypes.DELETE_INCOME_FAILURE,
      payload
    };
  },
};
