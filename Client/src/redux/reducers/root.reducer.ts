import { AnyAction, Reducer, combineReducers } from "redux";
import authReducer from "./auth.reducer";
import incomeReducer from "./income.reducer";
import expenseReducer from "./expense.reducer";

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
  auth: authReducer,
  income: incomeReducer,
  expense: expenseReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
