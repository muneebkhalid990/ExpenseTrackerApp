import userModel from "../../models/user/user.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../models_mongodb/user/index.js";
import demoEmail from "../../email/email.js";
import otpGenerator from "otp-generator";
import randomstring from "randomstring";

const envdata = process.env;

const authController = {
  register: async (req, res) => {
    if (envdata.dbUse == "postgres") {
      try {
        const { firstName, lastName, email, password, eToken } = req.body;
        const user = await userModel.findOne({
          where: {
            email,
          },
        });

        if (user) {
          return res.status(400).json({
            message: `User with this ${email} already exists`,
          });
        } else {
          const hashPassword = await hash(password, 10);
          const randomString = randomstring.generate();

          const expiry = new Date();
          expiry.setMinutes(expiry.getMinutes() + 10);
          const expiryTime = expiry.getTime();

          const temp = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            eToken: randomString,
            expiryTimestamps: expiryTime,
          });

          demoEmail({
            from: "hi@demomailtrap.com",
            to: "muneeb.ahmad@piecyfer.com",
            subject: "Verify Your Email",
            text: `<P> Hi ${temp.firstName}, please click on the link and <a href="http://localhost:3300/auth/verifyEmail?eToken=${temp.eToken}&id=${temp.id}"> Verify your Email</a>`,
          });

          return res.status(201).json({
            message: `User has Registred, Please Verify your Email`,
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error,
          message: `Something bad happened`,
        });
      }
    } else if (envdata.dbUse == "mongodb") {
      // try {
      //   const { firstName, lastName, email, password } = req.body;
      //   const user = await UserModel.findOne({ email });
      //   if (user) {
      //     return res.status(400).json({
      //       message: `User with this ${email} already exits`,
      //     });
      //   }
      //   const hashPassword = await hash(password, 10);
      //   const data = UserModel({
      //     firstName,
      //     lastName,
      //     email,
      //     password: hashPassword,
      //   });
      //   await data.save();
      //   return res.status(201).json({
      //     message: `User Registered`,
      //   });
      // } catch (error) {
      //   // console.log(error);
      //   return res.status(500).json({
      //     error,
      //     message: `Something bad happened`,
      //   });
      // }
    }
  },
  login: async (req, res) => {
    // console.log("api called!.......")
    if (envdata.dbUse == "postgres") {
      try {
        const { email, password } = req.body;

        if (!(email && password)) {
          res.status(400).json({ message: "All fields are required" });
        }
        const user = await userModel.findOne({
          where: {
            email,
          },
        });

        if (user.verified === true) {
          if (!user) {
            return res.status(401).json({
              message: `Invalid Credentials `,
            });
          }

          const comparePassword = await compare(password, user.password);

          if (!comparePassword) {
            return res.status(401).json({
              message: `Invalid Credentials`,
            });
          }

          const data = {
            id: user.id,
            email: user.email,
          };

          const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "3h",
          });

          await user.update({ jwtToken: token });
          await user.save();

          const OTP = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });

          await user.update({ otp: OTP });

          demoEmail(
            {
              from: "hi@demomailtrap.com",
              to: "muneeb.ahmad@piecyfer.com",
              subject: "Login Notification",
              text: `We detected a new login Your OTP : ${OTP} <br> if that wasn't you please Contact Support or Reset password`,
            },
            // console.log("its working")
          );

          return res.status(200).json({
            message: `User Login Successfully`,
            token,
            // OTP,
          });
        } else {
          return res.status(401).json({
            message: `Please Verify your Email First`,
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error,
          message: `Something bad happened`,
        });
      }
    } else if (envdata.dbUse == "mongodb") {
      // try {
      //   const { email, password } = req.body;
      //   if (!(email && password)) {
      //     res.status(400).json({ message: "All fields are required" });
      //   }
      //   const user = await userModel.findOne({ email });
      //   // console.log(user);
      //   if (!user) {
      //     return res.status(401).json({
      //       message: `Invalid Credentials 1`,
      //     });
      //   }
      //   const comparePassword = await compare(password, user.password);
      //   if (!comparePassword) {
      //     return res.status(401).json({
      //       message: `Invalid Credentials`,
      //     });
      //   }
      //   const data = {
      //     id: user.id,
      //     email: user.email,
      //   };
      //   const token = jwt.sign(data, process.env.JWT_SECRET, {
      //     expiresIn: "3h",
      //   });
      //   return res.status(200).json({
      //     message: `User Login`,
      //   });
      // } catch (error) {
      //   // console.log(error);
      //   return res.status(500).json({
      //     error,
      //     message: `Something bad happened`,
      //   });
      // }
    }
  },
  verfiedEmail: async (req, res) => {
    try {
      const { eToken, id } = req.query;
      // const {password}=req.body;

      const user = await userModel.findOne({
        where: {
          id,
        },
      });

      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes());
      const currentTime = expiry.getTime();

      if (currentTime < user.expiryTimestamps) {
        if (user.eToken == eToken && user.verified !== true) {
          await user.update({ verified: true });
          await user.save();

          return res.status(201).json({
            message: `Email Verified`,
          });
        }
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
  // logout: async(req,res)=>{

  // },
};

export default authController;
