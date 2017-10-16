import { Router } from "express";
import { authJwt } from "../../config/passport";
import * as CategoryController from "./CategoryController";

// import validate from 'express-validation';
// import CategoryValidation from './Validation';
const routes = new Router();

routes.get("/", CategoryController.listCategory);
routes.get("/:id", CategoryController.detailCategory);
// ////////////////////////////////////
routes.post("/create", authJwt, CategoryController.addCategory);

routes.patch("/update/:id", authJwt, CategoryController.editCategory);

routes.delete("/delete/:id", authJwt, CategoryController.removeCategory);

// routes.get('/create', authJwt, validate(CategoryValidation.addCategory), CategoryController.addCategory);
// routes.patch('/update/:slug', authJwt, validate(CategoryValidation.editCategory), CategoryController.editCategory);

export default routes;

// U2FsdGVkX19CqYjfxvUINqgtXvEijOP38ctK2gvEaUI=
