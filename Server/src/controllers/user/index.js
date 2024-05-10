import userModel from "../../models/user/user.js";
import UserModel from "../../models_mongodb/user/index.js";
import randomstring, { generate } from "randomstring";
import demoEmail from "../../email/email.js";
import { compare, hash } from "bcrypt";

const userController = {
  // showProfile: async(req,res)=>{

  // },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log(req.user.jwtToken);
      if (req.user.jwtToken !== user.jwtToken) {
        return res.status(401).json({
          message: "You do not have the Access",
        });
      } else {
        await user.destroy();
        return res.status(200).json({
          message: "User deleted successfully",
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
      const { firstName, lastName, email, password } = req.body;

      const user = await userModel.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      await user.save();

      res.json({
        message: "User Updated",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          message: `User with this ${email} does not exists`,
        });
      } else {
        const randomString = randomstring.generate();
        await user.update({ eToken: randomString });
        await user.save();

        demoEmail({
          from: "hi@demomailtrap.com",
          to: "muneeb.ahmad@piecyfer.com",
          subject: "Reset Your Password",
          text: `<P> Hi ${user.firstName}, please click on the link and <a href="http://localhost:3300/user/resetPassword?eToken=${user.eToken}&id=${user.id}"> reset your password</a>`,
        });

        return res.status(400).json({
          message: `Please check your email and reset your password`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { eToken, id } = req.query;
      const { password } = req.body;

      const user = await userModel.findOne({
        where: {
          id,
        },
      });

      if (user.eToken == eToken) {
        const hashPassword = await hash(password, 10);
        await user.update({ password: hashPassword });
        await user.save();

        return res.status(201).json({
          message: `Password Reset Success`,
        });
      } else {
        return res.status(200).json({
          message: "The link has Expired",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something bad happened",
      });
    }
  },
};

export default userController;
