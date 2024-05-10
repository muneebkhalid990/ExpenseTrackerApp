import {Router} from "express";

import incomeController from "../../controllers/incomes/index.js";
import AuthenticateMiddleware from "../../middleware/authenticate.js";
const incomeRouter = Router();

incomeRouter.use(AuthenticateMiddleware);

incomeRouter.get("/",incomeController.getAll);
incomeRouter.get("/:id",incomeController.getSingle);
incomeRouter.post("/",incomeController.create);
incomeRouter.put("/:id",incomeController.update);
incomeRouter.delete("/:id",incomeController.delete);

export default incomeRouter;