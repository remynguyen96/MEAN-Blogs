import User from './User';
import CryptoJS from 'crypto-js';
import multer from 'multer';
import constants from '../../config/constants';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null,'./src/uploads/avatars');
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
      fileSize: 4000000
   }
}).single('file');

export async function uploadAvatar(req, res){
  try {
    upload(req, res, (err) =>  {
    //  console.log(req.file);
     if(err){
       if(err.code === 'LIMIT_FILE_SIZE'){
         return res.status(203).json({success: false, message: 'File size is too large. Max limit is 4MB'})
       }else if(err.code === 'filetype'){
         return res.status(203).json({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg'})
       }
         return res.status(203).json({success: false, message: 'File was not able to be uploaded !'});
     }
     return res.status(200).json({success: true, message: req.file.filename});
     //  return res.status(200).json({success: true, message: 'File was uploaded !'});
   });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function signUp(req, res) {
  try {
    req.body.ipAddress = decryptCode(req.body.ipAddress);
    req.body.password = decryptCode(req.body.password);
    req.body.passwordConfirm = decryptCode(req.body.passwordConfirm);
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('ipAddress','Ip address is not valid').isIP();
    req.checkBody('email','Invalid email').isEmail();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('passwordConfirm','Password confirm is not match').equals(req.body.password);
    const errors = req.validationErrors();
    if(errors) {
      const messages = [];
      errors.forEach((err) => messages.push(err.msg) );
      return res.status(203).json({ errors: messages });
    }
    const newUser = await User.findOne({email: req.body.email});
    if(newUser) {
      return res.status(203).json({ errors: 'Email is existed !' });
    }
    const user = await User.create(req.body);
    return res.status(201).json(user.toAuthJSON());
  } catch (e) {
    return res.status(400).json(e);
  }
}

const iv = CryptoJS.enc.Base64.parse(constants.IV);
const passportCode   = constants.PASSPORTCODE;

function decryptCode(code) {
  const decrypted = CryptoJS.AES.decrypt(code, passportCode, {iv});
  return decrypted.toString(CryptoJS.enc.Utf8);
}


export function signIn(req, res, next) {
  res.status(200).json(req.user.toAuthJSON());
  return next();
}

export async function listUsers(req, res) {
  try {
    const users = await User.listUsers();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function detailUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
      const images = user.avatar;
      fs.unlink(`./src/uploads/avatars/${images}`,(err) => {
        if(err) throw err;
      });
      Object.keys(req.body).forEach((item) => {
        user[item] = req.body[item];
      });
    return res.status(200).json(await user.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const images = user.avatar;
    fs.unlink(`./src/uploads/avatars/${images}`,(err) => {
      if(err) throw err;
    });
    await user.remove();
    // return res.sendStatus(200);
    return res.status(200).json('success');
  } catch (e) {
    return res.status(400).json(e);
  }
}
