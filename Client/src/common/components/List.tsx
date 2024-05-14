/* eslint-disable @typescript-eslint/no-explicit-any */
import Transaction from "./Transactions";
import { TransactionData } from "./Transactions";


interface ListProps {
  transactions: TransactionData[];
  type: string
}

const List: React.FC<ListProps> = ({ transactions , type}) => {
  console.log("transactions...........0123", transactions);
  return (
    <div className="w-72 flex flex-col py-10 gap-2">
      <h3 className="py-4 font-bold text-xl text-center">History</h3>
      {transactions.map((transaction: any, index: any) => (
        <Transaction key={index} transaction={transaction} type={type} />
      ))}
    </div>
  );
};

export default List;
