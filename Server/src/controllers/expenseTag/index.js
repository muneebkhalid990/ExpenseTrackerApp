import expenseTagModel from "../../models/expenseTag/expenseTag.js";
import incomeTagModel from "../../models/inomeTag/incomeTag.js";

const expenseTagController = {
  create: async (req, res) => {
    try {
      const { name, userId, expenseId } = req.body;

      const expensetag = await expenseTagModel.findOne({
        where: {
          name,
        },
      });

      if (expensetag) {
        return res.status(400).json({
          message: `Tag with this ${name} already exists`,
        });
      } else {
        await expenseTagModel.create({
          name,
          userId,
          expenseId,
        });

        return res.status(201).json({
          message: `Tag has Created`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error,
        message: `Something bad happened`,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, expenseId } = req.body;

      const expensetag = await incomeTagModel.findOne({
        where: {
          id,
        },
      });
      if (!expensetag) {
        return res.status(400).json({
          message: `Tag does not Exist`,
        });
      }

      expensetag.name = name;
      expensetag.expenseId = expenseId;

      await expensetag.save();

      res.json({
        message: `Tag Updated`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Something bad happened`,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const expensetag = await expenseTagModel.findOne({
        where: {
          id,
        },
      });

      if (!expensetag) {
        res.status(400).json({
          message: `Tag does not Exist`,
        });
      }
      await expensetag.destroy();

      res.status(200).json({
        message: `Tag deleted Successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Bad Happened",
      });
    }
  },
};

export default expenseTagController;
