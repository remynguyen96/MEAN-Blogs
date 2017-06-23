import User from './User';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null,'./dist/uploads/avatars');
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
      fileSize: 5000000
   }
}).single('file');

export async function uploadImage(req, res){
  try {
    upload(req, res, (err) =>  {
    //  console.log(req.file);
     if(err){
       if(err.code === 'LIMIT_FILE_SIZE'){
         return res.status(203).json({success: false, message: 'File size is too large. Max limit is 5MB'})
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

export async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user.authJSON());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export function signIn(req, res, next) {
  res.status(200).json(req.user.authJSON());
  return next();
}
