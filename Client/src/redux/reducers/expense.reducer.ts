/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseActionTypes } from "../actions/expense.actions";

interface Expense {
  id: any;
  title: string;
  amount: number;
  category: string;
  description: string;
}

export interface ExpenseState {
  isLoading: boolean;
  error: string | null;
  expenses: Expense[]
}
const initialState: ExpenseState = {
  isLoading: false,
  error: null,
  expenses: [],
};

const expenseReducer = (state = initialState, action: any) => {
  console.log("Expense action .............", action);

  switch (action.type) {
    case ExpenseActionTypes.EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ExpenseActionTypes.EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        expenses: action.payload.expenses,
      };
    case ExpenseActionTypes.EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ExpenseActionTypes.ADD_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ExpenseActionTypes.ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        expenses: [...state.expenses, action.payload],
      };
    case ExpenseActionTypes.ADD_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ExpenseActionTypes.EDIT_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ExpenseActionTypes.EDIT_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        expenses: state.expenses.map(expense => expense.id === action.payload.id ? action.payload : expense),
      };
    case ExpenseActionTypes.EDIT_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ExpenseActionTypes.DELETE_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ExpenseActionTypes.DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        expenses: state.expenses.filter(expense => expense.id !== action.payload),
      };
    case ExpenseActionTypes.DELETE_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default expenseReducer;