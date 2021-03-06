import User from '../users/User';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null,'./dist/uploads/blogs');
  },
  filename: (req, file, cb) => {
    if(!file.originalname.match(/\.(png|jpg|jpeg|gif|svg)$/)){
      const err = new Error();
          err.code = 'filetype';
        return cb(err);
    }
      const typeFile = file.originalname.split('.')[file.originalname.split('.').length -1];
      const nameFile = file.originalname.replace(`.${typeFile}`,'');
      cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
  }
});

const upload = multer({
   storage,
   limits: {
      fileSize: 8000000
   }
}).single('file');

export async function uploadImage(req, res){
  try {
    upload(req, res, (err) =>  {
    //  console.log(req.file);
     if(err){
       if(err.code === 'LIMIT_FILE_SIZE'){
         return res.status(203).json({success: false, message: 'File size is too large. Max limit is 8MB'})
       }else if(err.code === 'filetype'){
         return res.status(203).json({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg'})
       }
         return res.status(203).json({success: false, message: 'File was not able to be uploaded !'});
     }
     return res.status(200).json({success: true, message: 'File was uploaded !'});
   });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function listBlogs(req, res) {
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const blogs = await Blog.listBlogs({skip, limit})
    return res.status(200).json(blogs);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function detailBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate('author');
    return res.status(200).json(blog);
  } catch (e) {
    return res.status(400).json(e);
  }
}

// ////////////////////////////////////
export async function createBlog(req, res) {
  try {
    const blog = await Blog.createBlog(req.body, req.user._id);
    return res.status(201).json(blog);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function listBlogsManager(req, res) {
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Blog.listBlogs({skip, limit})
    ]);
    const blogs = promise[1].reduce((arr, blog) => {
      const favorite = promise[0].favorites.isBlogFavorite(blog._id);
      arr.push({
        ...blog.toJSON(),
        favorite
      });
      return arr;
    },[]);
    return res.status(200).json(blogs);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function detailBlogManager(req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Blog.findById(req.params.id).populate('author')
    ]);
    const blog = promise[1];
    const favorite = promise[0].favorites.isBlogFavorite(blog._id);
    return res.status(200).json({
      ...blog,
      favorite
    });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function updateBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog.author.equals(req.user._id)){
      return res.sendStatus(401);
    }
    Object.keys(req.body).forEach((key) => {
      blog[key] = req.body[key];
    });
    return res.status(200).json(await blog.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog.author.equals(req.user._id)) {
      return res.sendStatus(401);
    }
    await blog.remove();
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).json(e);
  }
}
