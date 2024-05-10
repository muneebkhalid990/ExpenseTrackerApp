import { Router } from "express";
import expenseTagController from "../../controllers/expenseTag/index.js";

const expenseTagRouter = Router();


expenseTagRouter.post("/",expenseTagController.create);
expenseTagRouter.put("/updateTag",expenseTagController.update);
expenseTagRouter.delete("/deleteTag",expenseTagController.delete);

export default expenseTagRouter;