import { Router } from 'express';
import validate from 'express-validation';
import { authLocal } from '../../config/passport';
import * as UserController from './UserController';
import UserValidation from './Validation';

const routes = new Router();

routes.post('/sign-up',validate(UserValidation.signUp), UserController.signUp);
routes.post('/sign-in',authLocal, UserController.signIn);


export default routes;
