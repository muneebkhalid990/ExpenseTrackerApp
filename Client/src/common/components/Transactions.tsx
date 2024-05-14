/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { IncomeActionCreator } from "../../redux/actions/income.actions";
import { ExpenseActionCreator } from "../../redux/actions/expense.actions";

export interface TransactionData {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string;
  // map: any;
}

interface TransactionProps {
  transaction: TransactionData;
  type: string;
}

const Transaction: React.FC<TransactionProps> = ({ transaction , type }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] =
    useState<TransactionData>(transaction);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {

    if(type == "income"){
      dispatch(IncomeActionCreator.editIncomeRequest(editedTransaction));
    }else if (type == "expense"){
      dispatch(ExpenseActionCreator.editExpenseRequest(editedTransaction));
    }
    
    // setEditedTransaction(editedTransaction);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Transaction.......000000.....",editedTransaction);
    console.log("Type.......", type);

    if(type == "income"){
      dispatch(IncomeActionCreator.deleteIncomeRequest(transaction));
    }else if(type == "expense"){
      dispatch(ExpenseActionCreator.deleteExpenseRequest(transaction));
    }
    // setEditedTransaction(transaction);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTransaction(transaction);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center bg-gray-100 py-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-x-4 text-sm">
        <div className="flex flex-col justify-center pl-3 pr-4">
          <span className="font-bold text-gray-600 mb-1">Title:</span>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedTransaction.title}
              onChange={handleChange}
              className="text-gray-800 mb-2 border rounded-md px-2 py-1"
            />
          ) : (
            <span className="text-gray-800 mb-2">{transaction.title}</span>
          )}
        </div>
        <div className="flex flex-col justify-center pl-1 pr-2">
          <span className="font-bold text-gray-600 mb-1">Amount:</span>
          {isEditing ? (
            <input
              type="number"
              name="amount"
              value={editedTransaction.amount.toString()}
              onChange={handleChange}
              className="text-green-600 mb-2 border rounded-md px-2 py-1"
            />
          ) : (
            <span className="text-green-600 mb-2">${transaction.amount}</span>
          )}
        </div>
        <div className="flex flex-col justify-center pl-3 pr-4">
          <span className="font-bold text-gray-600 mb-1">Category:</span>
          {isEditing ? (
            <input
              type="text"
              name="category"
              value={editedTransaction.category}
              onChange={handleChange}
              className="text-gray-800 mb-2 border rounded-md px-2 py-1"
            />
          ) : (
            <span className="text-gray-800 mb-2">{transaction.category}</span>
          )}
        </div>
        <div className="flex flex-col justify-center pl-1 pr-2">
          <span className="font-bold text-gray-600 mb-1">Description:</span>
          {isEditing ? (
            <input
              type="text"
              name="description"
              value={editedTransaction.description}
              onChange={handleChange}
              className="text-gray-800 mb-2 border rounded-md px-2 py-1"
            />
          ) : (
            <span className="text-gray-800 mb-2">
              {transaction.description}
            </span>
          )}
        </div>
        <div className="flex items-center justify-center space-x-3 p-1 pl-6 pr-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-300 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faSave} className="mr-1" />
                {/* Save */}
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-300 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-1" />
                {/* Cancel */}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="bg-blue-300 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-1" />
                {/* Edit */}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-300 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-1" />
                {/* Delete */}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;