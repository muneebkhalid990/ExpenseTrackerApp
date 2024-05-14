import expenseModel from "../../models/expense/index.js";
import ExpenseModel from "../../models_mongodb/expense/index.js";

const expensesController = {
  create: async (req, res) => {
    try {
      const uId = req.user.id;
      const { title, amount, category, description, date } = req.body;
      if (!title || !category || !description) {
        return res.status(201).json({
          message: `All Fields are required`,
        });
      }
      if (amount <= 0 || !amount === "INTEGER") {
        return res.status(201).json({
          message: `Amount should be a Positive Number`,
        });
      }
      const newExpense = await expenseModel.create({
        title,
        amount,
        category,
        description,
        // date,
        userId: uId
      });
      const id = newExpense.id;
      return res.status(201).json({
        resData: {id, title, amount, category, description },
        message: `Expense Field Added`,
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: `Something bad happened`,
      });
    }
  },
  getAll: async (req, res) => {
    const uId = req.user.id;

    const expenses = await expenseModel.findAll({
      where:{
        userId: uId
      }
    });
    res.json({
      expenses,
    });
  },
  getSingle: async (req, res) => {
    try {
      const uId = req.user.id;
        const { id } = req.params;
        const expense = await expenseModel.findOne({
          where: {
            id,
            userId:uId
          },
        });
        if (!expense) {
          return res.status(404).json({
            message: "Expense Field not found",
          });
        }
  
        res.json({
          expense,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Something bad happened",
        });
      }
  },
  delete: async (req, res) => {
    try {

      const uId = req.user.id;
        const { id } = req.params;
        const expense = await expenseModel.findOne({
          where: {
            id,
            userId:uId
          },
        });
        if (!expense) {
          return res.status(404).json({
            message: "Expense Field not found",
          });
        }
  
        await expense.destroy();
        res.json({
          message: "Expense Field deleted successfully",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Something bad happened",
        });
      }
  },
  update: async (req, res) => {
    try {
      const uId = req.user.id;
        const { id } = req.params;
        const { title, amount, category, description, date } = req.body;
  
        const expense = await expenseModel.findOne({
          where: {
            id,
            userId:uId
          },
        });
        if (!expense) {
          return res.status(404).json({
            message: "Expense Field not found",
          });
        }
  
        expense.title = title;
        expense.amount = amount;
        expense.category = category;
        expense.description = description;
        expense.date = date;
        await expense.save();
  
        res.json({
          message: "Expense Field Updated",
          expense,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Something bad happened",
        });
      }
  },
};

export default expensesController;
