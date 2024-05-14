import React from "react";
import Graph from "../components/Graph";

const Dashboard = () => {
  const TotalIncomeString = localStorage.getItem("income") || "0";
  const TotalExpenseString = localStorage.getItem("expense") || "0";

  // Parse the strings to numbers
  const IncomeTotal = parseFloat(TotalIncomeString);
  const ExpenseTotal = parseFloat(TotalExpenseString);

  // Create an object
  const Total = {
    IncomeTotal,
    ExpenseTotal,
  };

  console.log("Total.............",Total);

  return (
  <div>
    <Graph data={Total} type="dashboard"/>
  </div>
);
};

export default Dashboard;
