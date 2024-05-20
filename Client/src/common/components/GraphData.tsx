import { TransactionData } from "./Transactions";
import { GraphData } from "./Graph";

export const calculateAggregatedData = (transactions: TransactionData[]): GraphData => {
  return transactions.reduce((acc, transaction) => {
    const amount = Number(transaction.amount);
    if (isNaN(amount)) {
      throw new Error(`Invalid amount ${transaction.amount} in transaction: ${JSON.stringify(transaction)}`);
    }

    if (acc[transaction.category]) {
      acc[transaction.category] += amount;
    } else {
      acc[transaction.category] = amount;
    }

    return acc;
  }, {} as GraphData);
};

