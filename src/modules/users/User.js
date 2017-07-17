import mongoose,{ Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';
import Blog from '../blogs/Blog';

const UserSchema = new Schema({
  name : {
    type: String,
    trim: true,
    required: [true, 'Name is required !']
  },
  email : {
    type: String,
    trim: true,
    unique: true,
    required: [true,'Email is required !'],
    validate : {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email !'
    }
  },
  password: {
    type: String,
    trim: true,
    required: [true,'Password is required !'],
  },
  avatar: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'avatar.png',
  },
  ipAddress: {
    type: String,
    required: [true, 'IP Address is required !']
  },
  favorites: {
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  }
},{timestamps: true});

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken !'
});

UserSchema.pre('save',function(next) {
  if(this.isModified('password')){
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      { _id: this._id },
      constants.JWT_SECRET,
      { expiresIn: 1123800 }
      // { expiresIn: 1800 } // 30 minutes
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      avatar: this.avatar,
    };
  },
  _favorites: {
    async blogs(blogId) {
      if(this.favorites.blogs.indexOf(blogId) >= 0) {
        this.favorites.blogs.remove(blogId);
        await Blog.decFavoriteCount(blogId);
      } else {
        this.favorites.blogs.push(blogId);
        await Blog.incFavoriteCount(blogId);
      }
      return this.save();
    },
    isBlogFavorite(blogId) {
      if(this.favorites.blogs.indexOf(blogId) >= 0) {
        return true;
      }
      return false;
    }
  }
}

UserSchema.statics = {
  listUsers() {
    return this.find().sort({createdAt: -1});
  },

}

export default mongoose.model('User',UserSchema);
