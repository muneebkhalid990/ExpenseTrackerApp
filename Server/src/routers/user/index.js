import {Router} from "express";
import userController from "../../controllers/user/index.js";
import AuthenticateMiddleware from "../../middleware/authenticate.js";
const userRouter = Router();

userRouter.use(AuthenticateMiddleware);

// userRouter.get("/profile",userController.showProfile);
userRouter.delete("/deleteUser/:id",userController.delete);
userRouter.put("/updateUser/:id",userController.update);
userRouter.post("/forgetPassword",userController.forgetPassword);
userRouter.get("/resetPassword",userController.resetPassword);

export default userRouter;