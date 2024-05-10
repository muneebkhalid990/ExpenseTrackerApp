import {all } from 'redux-saga/effects';

import authSaga from './auth.saga';
import incomeSaga from './income.saga';
import expenseSaga from './expense.saga';

function* rootSaga (){
  yield all([authSaga(), incomeSaga(), expenseSaga()]);
}
  
  export default rootSaga;
  