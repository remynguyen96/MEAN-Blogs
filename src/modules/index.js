import userRoutes from './users/Routes';
import blogRoutes from './blogs/Routes';
import categoryRoutes from './categories/Routes';

export default app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    app.use('/api/users', userRoutes);
    app.use('/api/blogs', blogRoutes);
    app.use('/api/categories', categoryRoutes);
};
