import { Router } from "express";
import incomeTagController from "../../controllers/incomeTag/index.js";

const incomeTagRouter = Router();

incomeTagRouter.post("/",incomeTagController.create);
incomeTagRouter.put("/updateTag",incomeTagController.update);
incomeTagController.delete("/deleteTag",incomeTagController.delete);


export default incomeTagRouter;