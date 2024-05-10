/* eslint-disable @typescript-eslint/no-explicit-any */

import {RegisterOptions} from "react-hook-form"
import { IncomeState } from "../redux/reducers/income.reducer";
import { AuthState } from "../redux/reducers/auth.reducer";
import { ExpenseState } from "../redux/reducers/expense.reducer";

export declare global{
    export type RegisterFormData = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
      };
      
      export type SignInFormData = {
        email: string;
        password: string;
      };
      
      export type InputProps ={
        name: string;
        label: string;
        control: any;
        type?: string;
        rules?: RegisterOptions;
        errors: any;
      }

      export type ButtonProps ={
        type: "button" | "submit";
        buttonTitle: string;
        onClick?: () => void;
      }

      export interface IIncomeProp {
        title: string;
        amount: number;
        category: string;
        description: string;
      }
      export interface IExpenseProp {
        title: string;
        amount: number;
        category: string;
        description: string;
      }

      export interface RootState {
        auth: AuthState,
        income: IncomeState
        expense: ExpenseState
      }

      // export type ObjProp = {
      //   type: string;
      //   percent: number;
      //   color: string;
      // }

      // export type labelProp = {
      //   data: any
      // }
}

