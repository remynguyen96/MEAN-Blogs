import { Router } from 'express';
import { authJwt } from '../../config/passport';
import * as BlogController from './BlogController';
// import validate from 'express-validation';
// import BlogValidation from './Validation';

const routes = new Router();
routes.get('/', BlogController.listBlogs);
routes.get('/:slug', BlogController.detailBlog);
// ///////////////////////////////////
routes.post('/upload-image', authJwt, BlogController.uploadImage);
routes.post('/create', authJwt, BlogController.createBlog);
routes.patch('/update/:slug', authJwt, BlogController.updateBlog);
routes.delete('/delete/:slug', authJwt, BlogController.deleteBlog);
routes.get('/manager-list-blogs', authJwt, BlogController.listBlogsManager);
routes.get('/detail-blogs/:slug', authJwt, BlogController.detailBlogManager);

// routes.get('/create', authJwt, validate(BlogValidation.createPost), BlogController.createBlog);
// routes.get('/update/:slug', authJwt, validate(BlogValidation.createPost), BlogController.updateBlog);


export default routes;
