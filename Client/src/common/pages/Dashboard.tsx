import Graph from "../components/Graph";

const Dashboard = () => {
  const TotalIncomeString = localStorage.getItem("income") || "0";
  const TotalExpenseString = localStorage.getItem("expense") || "0";

  const Incomes = parseFloat(TotalIncomeString);
  const Expenses = parseFloat(TotalExpenseString);

  const Total = {
    Incomes,
    Expenses,
  };

  console.log("Total.............",Total);

  return (
  <div className="md:w-auto p-4 bg-white rounded-lg shadow-md flex flex-col justify-start items-center">
    <Graph data={Total} type="dashboard"/>
  </div>
);
};

export default Dashboard;
