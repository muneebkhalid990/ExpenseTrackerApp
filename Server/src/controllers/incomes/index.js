import incomeModel from "../../models/income/index.js";
import IncomeModel from "../../models_mongodb/income/index.js"

const incomeController = {
  create: async (req, res) => {
    // console.log("Income Api Called");
    const uId = req.user.id;

    try {
      const { title, amount, category, description } = req.body;
      // console.log(req.body);
      if (!title || !category || !description) {
        return res.status(206).json({
          message: `All Fields are required`,
        });
      }
      if (amount <= 0 || !amount === "INTEGER") {
        return res.status(406).json({
          message: `Amount should be a Positive Number`,
        });
      }
      await incomeModel.create({
        title,
        amount,
        category,
        description,
        userId: uId
      });

      return res.status(201).json({
        resData: { title, amount, category, description },
        message: `Income Field Added`,
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

    const incomes = await incomeModel.findAll({
      where:{
        userId:uId
    }
  });
    res.json({
      incomes,
    });
  },
  getSingle: async (req, res) => {
    try {
      const uId = req.user.id;
      const { id } = req.params;
      const income = await incomeModel.findOne({
        where: {
          id,
          userId:uId,
        },
      });
      if (!income) {
        return res.status(404).json({
          message: "Income Field not found",
        });
      }

      res.json({
        income,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
  update: async (req, res) => {
    console.log("Income Api Called");
    try {
      const uId = req.user.id;
      const { id } = req.params;
      const { title, amount, category, description, date } = req.body;

      const income = await incomeModel.findOne({
        where: {
          id,
          userId:uId
        },
      });
      if (!income) {
        return res.status(404).json({
          message: "Income not found",
        });
      }

      income.title = title;
      income.amount = amount;
      income.category = category;
      income.description = description;
      income.date=date;
      await income.save();

      res.json({
        message: "Income Field Updated",
        income,
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
      const income = await incomeModel.findOne({
        where: {
          id,
          userId:uId
        },
      });
      if (!income) {
        return res.status(404).json({
          message: "Income Field not found",
        });
      }

      await income.destroy();
      res.json({
        message: "Income Field deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
};

export default incomeController;
