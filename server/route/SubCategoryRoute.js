import { Router } from "express";
import auth from "../middlewere/auth.js";
import {
  AddSubCategoryController,
  deletecategoryController,
  getSubCategoryController,
  updateCategoryControllers,
} from "../controllers/SubCategoryController.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, AddSubCategoryController);
subCategoryRouter.post("/get", getSubCategoryController);
subCategoryRouter.put("/update", auth, updateCategoryControllers);
subCategoryRouter.delete("/delete", auth, deletecategoryController);

export default subCategoryRouter;
