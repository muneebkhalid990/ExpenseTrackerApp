import Joi from "joi";

const userValidator = {
  register: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().max(50).required(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({
          message: "Invalid data",
          error,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        error,
        message: "Something bad happend",
      });
    }
  },
};

export default userValidator;
