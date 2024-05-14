/* eslint-disable no-prototype-builtins */
import { TransactionData } from "./Transactions";
import { GraphData } from "./Graph";

export const calculateAggregatedData = (transactions: TransactionData[]): GraphData => {
  return transactions.reduce((acc: GraphData, transaction: TransactionData) => {
    // Check if the category already exists in the accumulator
    if (acc.hasOwnProperty(transaction.category)) {
      // If yes, add the amount to the existing category
      acc[transaction.category] += transaction.amount;
    } else {
      // If not, create a new category with the amount
      acc[transaction.category] = transaction.amount;
    }
    return acc;
  }, {});
};
