import {Router} from "express";
import authController from "../../controllers/auth/index.js";
import userValidator from "../../validators/user/index.js";
const authRouter = Router();

authRouter.post("/register",userValidator.register,authController.register);
authRouter.post("/login",authController.login);
authRouter.get("/verifyEmail",authController.verfiedEmail);
// authRouter.post("/logout",authController.logout);

export default authRouter;