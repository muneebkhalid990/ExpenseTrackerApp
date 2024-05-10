import jwt from "jsonwebtoken";
import userModel from "../models/user/user.js";

const AuthenticateMiddleware = async (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if(!token){
        return res.status(401).json({
          message: "Authorization token Required"
        });
      }

      token = token.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await userModel.findOne({
        where: {
          id,
        },
      });
      // console.log(req.user);

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid request",
      });
    }
  };

  export default AuthenticateMiddleware;