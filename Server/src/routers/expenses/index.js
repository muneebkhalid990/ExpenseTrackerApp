import {Router} from "express";
import expensesController from "../../controllers/expenses/index.js";
import AuthenticateMiddleware from "../../middleware/authenticate.js";
const expenseRouter = Router();

expenseRouter.use(AuthenticateMiddleware);

expenseRouter.post("/",expensesController.create);
expenseRouter.get("/",expensesController.getAll);
expenseRouter.get("/:id",expensesController.getSingle);
expenseRouter.delete("/:id",expensesController.delete);
expenseRouter.put("/:id",expensesController.update);

export default expenseRouter;