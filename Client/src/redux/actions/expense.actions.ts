/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ExpenseActionTypes {
  EXPENSE_REQUEST = "EXPENSE_REQUEST",
  EXPENSE_SUCCESS = "EXPENSE_SUCCESS",
  EXPENSE_FAILURE = "EXPENSE_FAILURE",
  EDIT_EXPENSE_REQUEST = "EDIT_EXPENSE_REQUEST",
  EDIT_EXPENSE_SUCCESS = "EDIT_EXPENSE_SUCCESS",
  EDIT_EXPENSE_FAILURE = "EDIT_EXPENSE_FAILURE",
  ADD_EXPENSE_REQUEST = "ADD_EXPENSE_REQUEST",
  ADD_EXPENSE_SUCCESS = "ADD_EXPENSE_SUCCESS",
  ADD_EXPENSE_FAILURE = "ADD_EXPENSE_FAILURE",
  DELETE_EXPENSE_REQUEST = "DELETE_EXPENSE_REQUEST",
  DELETE_EXPENSE_SUCCESS = "DELETE_EXPENSE_SUCCESS",
  DELETE_EXPENSE_FAILURE = "DELETE_EXPENSE_FAILURE",
}

export const ExpenseActionCreator = {
  expenseRequest: () => {
    return {
      type: ExpenseActionTypes.EXPENSE_REQUEST,
    };
  },
  expenseSuccess: (payload: { expenses: any }) => {
    return {
      type: ExpenseActionTypes.EXPENSE_SUCCESS,
      payload,
    };
  },
  expenseFailure: (payload: { error: string }) => {
    return {
      type: ExpenseActionTypes.EXPENSE_FAILURE,
      payload,
    };
  },
  editExpenseRequest: (payload: {
    id: number;
    title: string;
    amount: number;
    category: string;
    description: string;
  }) => {
    return {
      type: ExpenseActionTypes.EDIT_EXPENSE_REQUEST,
      payload,
    };
  },
  editExpenseSuccess: (payload: any) => {
    return {
      type: ExpenseActionTypes.EDIT_EXPENSE_SUCCESS,
      payload,
    };
  },
  editExpenseFailure: (payload: { error: string }) => {
    return {
      type: ExpenseActionTypes.EDIT_EXPENSE_FAILURE,
      payload,
    };
  },
  addExpenseRequest: (payload: {
    title: string;
    amount: number;
    category: string;
    description: string;
  }) => {
    return {
      type: ExpenseActionTypes.ADD_EXPENSE_REQUEST,
      payload,
    };
  },
  addExpenseSuccess: (payload: {
    title: string;
    amount: number;
    category: string;
    description: string;
  }) => {
    return {
      type: ExpenseActionTypes.ADD_EXPENSE_SUCCESS,
      payload,
    };
  },
  addExpenseFailure: (payload: { error: string }) => {
    return {
      type: ExpenseActionTypes.ADD_EXPENSE_FAILURE,
      payload,
    };
  },
  deleteExpenseRequest: (payload: {
    id: number;
    title: string;
    amount: number;
    category: string;
    description: string;
  }) => {
    return {
      type: ExpenseActionTypes.DELETE_EXPENSE_REQUEST,
      payload,
    };
  },
  deleteExpenseSuccess: (payload: any) => {
    return {
      type: ExpenseActionTypes.DELETE_EXPENSE_SUCCESS,
      payload,
    };
  },
  deleteExpenseFailure: (payload: { error: string }) => {
    return {
      type: ExpenseActionTypes.DELETE_EXPENSE_FAILURE,
      payload,
    };
  },
};
