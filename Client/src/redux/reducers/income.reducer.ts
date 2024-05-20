/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomeActionTypes } from "../actions/income.actions";

interface Income {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string;
}

export interface IncomeState {
  isLoading: boolean;
  error: string | null;
  incomes: Income[]
}
const initialState: IncomeState = {
  isLoading: false,
  error: null,
  incomes: [],
};

const incomeReducer = (state = initialState, action: any) => {
  console.log("action", action);

  switch (action.type) {
    case IncomeActionTypes.INCOME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case IncomeActionTypes.INCOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        incomes: action.payload.incomes,
      };
    case IncomeActionTypes.INCOME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case IncomeActionTypes.ADD_INCOME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case IncomeActionTypes.ADD_INCOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        incomes: [...state.incomes, action.payload],
      };
    case IncomeActionTypes.ADD_INCOME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case IncomeActionTypes.EDIT_INCOME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case IncomeActionTypes.EDIT_INCOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        incomes: state.incomes.map(income => income.id === action.payload.id ? action.payload : income),
      };
    case IncomeActionTypes.EDIT_INCOME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case IncomeActionTypes.DELETE_INCOME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case IncomeActionTypes.DELETE_INCOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        incomes: state.incomes.filter(income => income.id !== action.payload),
      };
    case IncomeActionTypes.DELETE_INCOME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default incomeReducer;