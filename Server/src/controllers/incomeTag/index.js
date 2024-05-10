import incomeTagModel from "../../models/inomeTag/incomeTag.js";

const incomeTagController = {
  create: async (req, res) => {
    try {
      const { name, userId, incomeId } = req.body;

      const incometag = await incomeTagModel.findOne({
        where: {
          name,
        },
      });

      if (incometag) {
        return res.status(400).json({
          message: `Tag with this ${name} already exists`,
        });
      } else {
        await incomeTagModel.create({
          name,
          userId,
          incomeId,
        });

        return res.status(201).json({
          message: `Tag has Created`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, incomeId } = req.body;

      const incometag = await incomeTagModel.findOne({
        where: {
          id,
        },
      });

      if (!incometag) {
        return res.status(400).json({
          message: `Tag does not exist`,
        });
      }

      incometag.name = name;
      incometag.incomeId = incomeId;

      await incometag.save();

      res.json({
        message: "Tag Updated",
        incometag,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const incometag = await incomeTagModel.findOne({
        where: {
          id,
        },
      });

      if (!incometag) {
        return res.status(400).json({
          message: `Tag does not exist`,
        });
      }

      await incometag.destroy();
       res.status(200).json({
        message: "Tag deleted successfully",
      });
    } catch (error) {
      // return res.status(500).json({
      //   message: "Something Bad Happened",
      // });
    }
  },
};

export default incomeTagController;
