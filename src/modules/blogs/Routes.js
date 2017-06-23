import { Router } from 'express';
import validate from 'express-validation';
import { authJWT } from '../../config/passport';
import * as BlogController from './BlogController';
import BlogValidation from './Validation';

const routes = new Router();

routes.get('/', BlogController.listBlogs);
routes.get('/:slug', BlogController.detailBlog);
// ///////////////////////////////////
routes.get('/create', authJWT, validate(BlogValidation.createPost), BlogController.createBlog);
routes.get('/update/:slug', authJWT, validate(BlogValidation.createPost), BlogController.updateBlog);
routes.get('/delete/:slug', authJWT, BlogController.deleteBlog);


routes.get('/manager-list-blogs', authJWT, BlogController.listBlogsManager);
routes.get('/detail-blogs/:slug', authJWT, BlogController.detailBlogManager);

export default routes;
