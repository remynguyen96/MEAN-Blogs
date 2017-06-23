import { Router } from 'express';
import validate from 'express-validation';
import { authJWT } from '../../config/passport';
import * as CategoryController from './CategoryController';
import CategoryValidation from './Validation';

const routes = new Router();

routes.get('/', CategoryController.listCategory);
routes.get('/:id', CategoryController.detailCategory);
// ///////////////////////////////////
routes.get('/create', authJWT, validate(CategoryValidation.addCategory), CategoryController.addCategory);
routes.get('/update/:slug', authJWT, validate(CategoryValidation.editCategory), CategoryController.editCategory);
routes.get('/delete/:slug', authJWT, CategoryController.removeCategory);

export default routes;
