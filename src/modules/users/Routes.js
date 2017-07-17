import { Router } from 'express';
import { authLocal } from '../../config/passport';
import { authJwt } from '../../config/passport';
import * as UserController from './UserController';
// import validate from 'express-validation';
// import UserValidation from './Validation';

const routes = new Router();

routes.post('/sign-up', UserController.signUp);
// routes.post('/sign-up', validate(UserValidation.signUp), UserController.signUp);
routes.post('/sign-in', authLocal, UserController.signIn);

routes.post('/upload-image', authJwt, UserController.uploadAvatar);
routes.get('/', authJwt, UserController.listUsers);
routes.post('/:id', authJwt, UserController.detailUser);
routes.patch('/update/:id', authJwt, UserController.updateUser);
routes.delete('/delete/:id', authJwt, UserController.deleteUser);

export default routes;
