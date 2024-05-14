import { useForm } from "react-hook-form";
import Graph, { GraphData } from "../components/Graph";
import InputField from "../ui/elements/form/InputField";
import CustomButton from "../ui/elements/form/CustomButton";
import List from "../components/List";
import { useDispatch } from "react-redux";
import { ExpenseActionCreator } from "../../redux/actions/expense.actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateAggregatedData } from "../components/GraphData";

const Expense = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expense.expenses);
  const aggregatedData: GraphData = calculateAggregatedData(expenses);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IExpenseProp>();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await dispatch(ExpenseActionCreator.addExpenseRequest(data));
    dispatch(ExpenseActionCreator.expenseRequest());

    reset();
  });

  useEffect(() => {
    dispatch(ExpenseActionCreator.expenseRequest());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row md:justify-around bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md flex flex-col justify-start items-center">
        <Graph data={aggregatedData} type="expense" />
        </div>
        <div className="flex flex-col max-w-md justify-center md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <form className="flex flex-col gap-5 mx-auto" onSubmit={onSubmit}>
            <div className="grid gap-4">
              <h2 className="text-3xl font-bold text-center">Transaction</h2>
              <InputField
                name="title"
                label="Title"
                type="text"
                rules={{ required: "Title is Required" }}
                control={control}
                errors={errors}
              />
              <InputField
                name="amount"
                label="Amount"
                type="number"
                rules={{ required: "Amount is Required" }}
                control={control}
                errors={errors}
              />
              <InputField
                name="category"
                label="Category"
                type="text"
                rules={{ required: "Category is Required" }}
                control={control}
                errors={errors}
              />
              <InputField
                name="description"
                label="Description"
                type="text"
                rules={{ required: "Description is Required" }}
                control={control}
                errors={errors}
              />
              <span className="flex justify-center">
                <CustomButton type="submit" buttonTitle="Add Income" />
              </span>
            </div>
          </form>
          <div className="mx-auto mt-8">
            <List transactions={expenses} type = "expense" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Expense;
