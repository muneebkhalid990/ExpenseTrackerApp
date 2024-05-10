import {Router} from "express";

import userRouter from "./user/index.js";
import expenseRouter from "./expenses/index.js";
import authRouter from "./auth/index.js";
import incomeRouter from "./income/index.js";
import expenseTagRouter from "./expenseTag/index.js";
import incomeTagRouter from "./incomeTag/index.js";

const allRoutes = Router();

allRoutes.use("/user",userRouter);
allRoutes.use("/expenses",expenseRouter);
allRoutes.use("/auth",authRouter);
allRoutes.use("/income",incomeRouter);
allRoutes.use("/expenseTag",expenseTagRouter);
allRoutes.use("/incomeTag",incomeTagRouter);


export default allRoutes;