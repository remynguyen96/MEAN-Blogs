module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/blogs',
  JWT_SECRET: 'ILOVELIFE',

  PASSPORTCODE: 'I-LOVE-MEDITATION',
  IV: '#base64IV#',

  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: '2525',
  MAIL_USERNAME: 'a1285327665551',
  MAIL_PASSWORD: '0875bbf87059c7'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost:27017/blogs'

};

const defaultConfig = {
  PORT: process.env.PORT || 4500
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(11);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(32);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(31);

var _User = __webpack_require__(4);

var _User2 = _interopRequireDefault(_User);

var _cryptoJs = __webpack_require__(7);

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const iv = _cryptoJs2.default.enc.Base64.parse(_constants2.default.IV);
const passportCode = _constants2.default.PASSPORTCODE;

function decryptCode(code) {
  const decrypted = _cryptoJs2.default.AES.decrypt(code, passportCode, { iv });
  return decrypted.toString(_cryptoJs2.default.enc.Utf8);
}

const localOpts = {
  usernameField: 'email'
  // passwordField: 'password',
  // passReqToCallback: true,
};

const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
  try {
    password = decryptCode(password);
    const user = await _User2.default.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});
// Jwt strategy

const jwtOpts = {
  // jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await _User2.default.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(33);

var _validator2 = _interopRequireDefault(_validator);

var _mongooseUniqueValidator = __webpack_require__(5);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _bcryptNodejs = __webpack_require__(24);

var _jsonwebtoken = __webpack_require__(9);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _Blog = __webpack_require__(6);

var _Blog2 = _interopRequireDefault(_Blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required !'],
    maxLength: [30, 'Name has max length is 30 letters !']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required !'],
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not a valid email !'
    }
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required !']
  },
  avatar: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'avatar.png'
  },
  ipAddress: {
    type: String,
    required: [true, 'IP Address is required !']
  },
  confirm: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: null
  },
  favorites: {
    blogs: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }]
  }
}, { timestamps: true });

UserSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken !'
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({ _id: this._id }, _constants2.default.JWT_SECRET, { expiresIn: '2m' //10h, 7d,
      // { expiresIn: 1800 } // 30 minutes
    });
  },
  toAuthJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      token: `${this.createToken()}`
      // token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      avatar: this.avatar
    };
  },
  _favorites: {
    async blogs(blogId) {
      if (this.favorites.blogs.indexOf(blogId) >= 0) {
        this.favorites.blogs.remove(blogId);
        await _Blog2.default.decFavoriteCount(blogId);
      } else {
        this.favorites.blogs.push(blogId);
        await _Blog2.default.incFavoriteCount(blogId);
      }
      return this.save();
    },
    isBlogFavorite(blogId) {
      if (this.favorites.blogs.indexOf(blogId) >= 0) {
        return true;
      }
      return false;
    }
  }
};

UserSchema.statics = {
  listUsers() {
    return this.find().sort({ createdAt: -1 });
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(5);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlogSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: [5, 'Title post need to be longer !'],
    required: [true, 'Title post is required !']
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: [5, 'Slug post need to be longer !'],
    required: [true, 'Slug post is required !']
  },
  description: {
    type: String,
    trim: true,
    minLength: [5, 'Description post need to be longer !'],
    required: [true, 'Description post is required !']
  },
  images: {
    type: String,
    trim: true,
    default: 'stories.jpg'
  },
  categories: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required !']
  }],
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // required: [true, 'Author is required !'],
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

BlogSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken !'
});

// BlogSchema.pre('find', function(next) {
//     this.populate({
//         path: 'author',
//         select: 'username created - _id'
//     });
//     next();
// });


// BlogSchema.pre('validate', function (next){
//   next();
// });

BlogSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      images: this.images,
      categories: this.categories,
      author: this.author,
      favoriteCount: this.favoriteCount,
      createdAt: this.createdAt
    };
  }
};

BlogSchema.statics = {
  createBlog(args, author) {
    return this.create(Object.assign({}, args, {
      author
    }));
  },
  listBlogs({ skip = 0, limit = 10 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author');
  },
  searchBlogs(query) {
    return this.find({ 'title': new RegExp(query, "i") }).populate('author');
  },
  incFavoriteCount(blogId) {
    return this.findByIdAndUpdate(blogId, { total: { favoriteCount: 1 } });
  },
  decFavoriteCount(blogId) {
    return this.findByIdAndUpdate(blogId, { total: { favoriteCount: -1 } });
  }
};

exports.default = _mongoose2.default.model('Blog', BlogSchema);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("crypto-js");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(28);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(25);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(26);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(27);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(11);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());
  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Routes = __webpack_require__(22);

var _Routes2 = _interopRequireDefault(_Routes);

var _Routes3 = __webpack_require__(18);

var _Routes4 = _interopRequireDefault(_Routes3);

var _Routes5 = __webpack_require__(21);

var _Routes6 = _interopRequireDefault(_Routes5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    app.use('/api/users', _Routes2.default);
    app.use('/api/blogs', _Routes4.default);
    app.use('/api/categories', _Routes6.default);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(15);

var _path2 = _interopRequireDefault(_path);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cookieParser = __webpack_require__(14);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _middleware = __webpack_require__(12);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(13);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import validator from 'express-validator';
const app = (0, _express2.default)(); /* eslint-disable no-console */

app.use((0, _cookieParser2.default)());
// NOTE: Setup Database
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.set('debug', true);
try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
}
_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
  throw e;
});

// NOTE: Setting url public
app.use('/images', _express2.default.static('src/uploads'));
// NOTE: Setup Middleware
(0, _middleware2.default)(app);
// NOTE: Setup Router
// app.use(validator());
(0, _modules2.default)(app);

// app.use(express.static(path.join(__dirname, 'src/views'))); --> not working
app.use(_express2.default.static('src/views'));
app.get('/', (req, res) => {
  return res.sendFile(_path2.default.join(__dirname, 'index.html'));
});
// http://localhost:4600/index.html

app.get('/page', (req, res) => {
  return res.sendFile(_path2.default.join(__dirname, 'login-page.html'));
});
// http://localhost:4600/page.html

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// NOTE: Setup Server
app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server Running On Port : ${_constants2.default.PORT} With ${process.env.NODE_ENV}`);
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = uploadImage;
exports.listBlogs = listBlogs;
exports.detailBlog = detailBlog;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
exports.listBlogsManager = listBlogsManager;
exports.detailBlogManager = detailBlogManager;
exports.searchBlogs = searchBlogs;
exports.openGraph = openGraph;

var _Blog = __webpack_require__(6);

var _Blog2 = _interopRequireDefault(_Blog);

var _User = __webpack_require__(4);

var _User2 = _interopRequireDefault(_User);

var _multer = __webpack_require__(10);

var _multer2 = _interopRequireDefault(_multer);

var _fs = __webpack_require__(8);

var _fs2 = _interopRequireDefault(_fs);

var _openGraphScraper = __webpack_require__(30);

var _openGraphScraper2 = _interopRequireDefault(_openGraphScraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer2.default.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/uploads/blogs');
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    }
    const typeFile = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const nameFile = file.originalname.replace(`.${typeFile}`, '');
    cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
  }
});

const upload = (0, _multer2.default)({
  storage,
  limits: {
    fileSize: 8000000
  }
}).single('file');

async function uploadImage(req, res) {
  try {
    upload(req, res, err => {
      //  console.log(req.file);
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(203).json({ success: false, message: 'File size is too large. Max limit is 8MB' });
        } else if (err.code === 'filetype') {
          return res.status(203).json({ success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg' });
        }
        return res.status(203).json({ success: false, message: 'File was not able to be uploaded !' });
      }
      return res.status(200).json({ success: true, message: req.file.filename });
    });
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function listBlogs(req, res) {
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const blogs = await _Blog2.default.listBlogs({ skip, limit });
    // ?skip=1&limit=2
    return res.status(200).json(blogs);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function detailBlog(req, res) {
  try {
    const blog = await _Blog2.default.findOne({ 'slug': req.params.slug }).populate('author');
    // const blog = await Blog.findById(req.params.id).populate('author');
    return res.status(200).json(blog);
  } catch (e) {
    return res.status(400).json(e);
  }
}

// ////////////////////////////////////
async function createBlog(req, res) {
  try {
    const blog = await _Blog2.default.createBlog(req.body, req.user._id);
    return res.status(201).json(blog);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function updateBlog(req, res) {
  try {
    const blog = await _Blog2.default.findOne({ 'slug': req.params.slug });
    if (!blog.author.equals(req.user._id)) {
      return res.sendStatus(401);
    }
    Object.keys(req.body).forEach(key => {
      blog[key] = req.body[key];
    });
    return res.status(200).json((await blog.save()));
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await _Blog2.default.findOne({ 'slug': req.params.slug });
    if (!blog.author.equals(req.user._id)) {
      return res.sendStatus(401);
    }
    const images = blog.images;
    _fs2.default.unlink(`./src/uploads/blogs/${images}`, err => {
      if (err) throw err;
    });
    await blog.remove();
    // return res.sendStatus(200);
    return res.status(200).json('success');
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function listBlogsManager(req, res) {
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const promise = await Promise.all([_User2.default.findById(req.user._id), _Blog2.default.listBlogs({ skip, limit })]);
    const blogs = promise[1].reduce((arr, blog) => {
      const favorite = promise[0].favorites.isBlogFavorite(blog._id);
      arr.push(Object.assign({}, blog.toJSON(), {
        favorite
      }));
      return arr;
    }, []);
    return res.status(200).json(blogs);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function detailBlogManager(req, res) {
  try {
    const promise = await Promise.all([_User2.default.findById(req.user._id), _Blog2.default.findById(req.params.id).populate('author')]);
    const blog = promise[1];
    const favorite = promise[0].favorites.isBlogFavorite(blog._id);
    return res.status(200).json(Object.assign({}, blog, {
      favorite
    }));
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function searchBlogs(req, res) {
  try {
    const keyQuery = req.query.q;
    const blogs = await _Blog2.default.searchBlogs(keyQuery);
    return res.status(200).json(blogs);
  } catch (e) {
    return res.status(400).json(e);
  }
}
// NOTE: Example opengraph for node

async function openGraph(req, res) {
  try {
    const url = req.body.opengraph;
    const options = {
      'url': url
    };
    (0, _openGraphScraper2.default)(options, (err, results) => {
      if (err) {
        return err;
      }
      return res.status(200).json(results);
    });
  } catch (e) {
    return res.status(400).json(e);
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _passport = __webpack_require__(3);

var _BlogController = __webpack_require__(17);

var BlogController = _interopRequireWildcard(_BlogController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import validate from 'express-validation';
// import BlogValidation from './Validation';

const routes = new _express.Router();

routes.post('/upload-image', _passport.authJwt, BlogController.uploadImage);
routes.post('/create', _passport.authJwt, BlogController.createBlog);
routes.patch('/update/:slug', _passport.authJwt, BlogController.updateBlog);
routes.delete('/delete/:slug', _passport.authJwt, BlogController.deleteBlog);
routes.get('/manager-list-blogs', _passport.authJwt, BlogController.listBlogsManager);
routes.get('/detail-blogs/:slug', _passport.authJwt, BlogController.detailBlogManager);
// ///////////////////////////////////
routes.get('/search-blogs', BlogController.searchBlogs);
routes.get('/', BlogController.listBlogs);
routes.get('/:slug', BlogController.detailBlog);

routes.post('/opengraph', BlogController.openGraph);

// routes.get('/create', authJwt, validate(BlogValidation.createPost), BlogController.createBlog);
// routes.get('/update/:slug', authJwt, validate(BlogValidation.createPost), BlogController.updateBlog);


exports.default = routes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(5);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CategorySchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [5, 'Name category need to be longer !'],
    required: [true, 'Name category is required !']
  },
  description: {
    type: String,
    trim: true,
    minLength: [5, 'Description category need to be longer !']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

CategorySchema.plugin(_mongooseUniqueValidator2.default, {
  message: `{VALUE} already taken !`
});

CategorySchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt
    };
  }
};

CategorySchema.statics = {
  listCategories({ skip = 0, limit = 5 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  }
};

exports.default = _mongoose2.default.model('Category', CategorySchema);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listCategory = listCategory;
exports.detailCategory = detailCategory;
exports.addCategory = addCategory;
exports.editCategory = editCategory;
exports.removeCategory = removeCategory;

var _Category = __webpack_require__(19);

var _Category2 = _interopRequireDefault(_Category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function listCategory(req, res) {
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const categories = await _Category2.default.listCategories({ skip, limit });
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function detailCategory(req, res) {
  try {
    const category = await _Category2.default.findById(req.params.id);
    return res.status(200).json(category);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function addCategory(req, res) {
  try {
    const category = await _Category2.default.create(req.body);
    return res.status(201).json(category);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function editCategory(req, res) {
  try {
    const category = await _Category2.default.findById(req.params.id);
    Object.keys(req.body).forEach(key => {
      category[key] = req.body[key];
    });
    return res.status(200).json((await category.save()));
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function removeCategory(req, res) {
  try {
    const category = await _Category2.default.findById(req.params.id);
    await category.remove();
    return res.status(200).json('success');
  } catch (e) {
    return res.status(400).json(e);
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _passport = __webpack_require__(3);

var _CategoryController = __webpack_require__(20);

var CategoryController = _interopRequireWildcard(_CategoryController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import validate from 'express-validation';
// import CategoryValidation from './Validation';
const routes = new _express.Router();

routes.get('/', CategoryController.listCategory);
routes.get('/:id', CategoryController.detailCategory);
// ////////////////////////////////////
routes.post('/create', _passport.authJwt, CategoryController.addCategory);

routes.patch('/update/:id', _passport.authJwt, CategoryController.editCategory);

routes.delete('/delete/:id', _passport.authJwt, CategoryController.removeCategory);

// routes.get('/create', authJwt, validate(CategoryValidation.addCategory), CategoryController.addCategory);
// routes.patch('/update/:slug', authJwt, validate(CategoryValidation.editCategory), CategoryController.editCategory);

exports.default = routes;

// U2FsdGVkX19CqYjfxvUINqgtXvEijOP38ctK2gvEaUI=

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _passport = __webpack_require__(3);

var _UserController = __webpack_require__(23);

var UserController = _interopRequireWildcard(_UserController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import validate from 'express-validation';
// import UserValidation from './Validation';

const routes = new _express.Router();

routes.post('/sign-up', UserController.signUp);
routes.get('/confirm/:token', UserController.confirmUser);
// routes.post('/sign-up', validate(UserValidation.signUp), UserController.signUp);
routes.post('/sign-in', _passport.authLocal, UserController.signIn);

routes.post('/upload-image', _passport.authJwt, UserController.uploadAvatar);
routes.get('/', _passport.authJwt, UserController.listUsers);
routes.post('/:id', _passport.authJwt, UserController.detailUser);
routes.patch('/update/:id', _passport.authJwt, UserController.updateUser);
routes.delete('/delete/:id', _passport.authJwt, UserController.deleteUser);

exports.default = routes;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = uploadAvatar;
exports.signUp = signUp;
exports.confirmUser = confirmUser;
exports.signIn = signIn;
exports.listUsers = listUsers;
exports.detailUser = detailUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

var _User = __webpack_require__(4);

var _User2 = _interopRequireDefault(_User);

var _cryptoJs = __webpack_require__(7);

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _multer = __webpack_require__(10);

var _multer2 = _interopRequireDefault(_multer);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _nodemailer = __webpack_require__(29);

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _fs = __webpack_require__(8);

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = __webpack_require__(9);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { check, validationResult } = require('express-validator/check');

const transporter = _nodemailer2.default.createTransport({
  host: _constants2.default.MAIL_HOST,
  port: _constants2.default.MAIL_PORT,
  secure: false, //true with port 465
  auth: {
    user: _constants2.default.MAIL_USERNAME,
    pass: _constants2.default.MAIL_PASSWORD
  }
});

const storage = _multer2.default.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/uploads/avatars');
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    }
    const typeFile = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const nameFile = file.originalname.replace(`.${typeFile}`, '');
    cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
  }
});

const upload = (0, _multer2.default)({
  storage,
  limits: {
    fileSize: 4000000
  }
}).single('file');

async function uploadAvatar(req, res) {
  try {
    upload(req, res, err => {
      //  console.log(req.file);
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(203).json({ success: false, message: 'File size is too large. Max limit is 4MB' });
        } else if (err.code === 'filetype') {
          return res.status(203).json({ success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg' });
        }
        return res.status(203).json({ success: false, message: 'File was not able to be uploaded !' });
      }
      return res.status(200).json({ success: true, message: req.file.filename });
      //  return res.status(200).json({success: true, message: 'File was uploaded !'});
    });
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function signUp(req, res) {
  try {
    // req.body.ipAddress = decryptCode(req.body.ipAddress);
    // req.body.password = decryptCode(req.body.password);
    // req.body.passwordConfirm = decryptCode(req.body.passwordConfirm);
    // req.checkBody('name','Name is required').notEmpty();
    // req.checkBody('ipAddress','Ip address is not valid').isIP();
    // req.checkBody('email','Invalid email').isEmail();
    // req.checkBody('password','Password is required').notEmpty();
    // req.checkBody('passwordConfirm','Password confirm is not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
      const messages = [];
      errors.forEach(err => messages.push(err.msg));
      return res.status(203).json({ errors: messages });
    }
    const newUser = await _User2.default.findOne({ email: req.body.email });
    if (newUser) {
      return res.status(203).json({ errors: 'Email is existed !' });
    }
    const user = await _User2.default.create(req.body);
    user.token = user.toAuthJSON().token;
    user.save();
    const mailOptions = {
      from: `Demo Express Js With Remy Nguyen 👻 <remynguyen@enlightened.com>`,
      to: `${user.email}@gmail.com`,
      subject: `Hello ${user.name} ✔ This is Mail Confirm From Blog JS`,
      text: 'Good Boy, Please Confirm Email Now !!!',
      html: `
      <h2 style="font-size:32px; color: #50D583; text-align:center">
            Good Morning ${user.name} !!!
      </h2>
      <a style="display: block;font-size:27px; color: #174DCF; text-align:center"          href="http://localhost:4600/api/users/confirm/${user.token}">
        Confirm Email
      </a>
      <p style="text-align: center; font-size: 20px; color: #3A3A3A"><i>Pleace Confirm Email Register..... !</i></p>
    `
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    return res.status(201).json(user.toAuthJSON());
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function confirmUser(req, res) {
  try {
    let token = req.params.token;
    const confirm = _jsonwebtoken2.default.verify(token, _constants2.default.JWT_SECRET);
    if (confirm) {
      const user = await _User2.default.findById(confirm._id);
      user.confirm = true;
      await user.save();
      return res.redirect('http://localhost:4600/');
    }
  } catch (e) {
    return res.status(400).json(e);
  }
}

const iv = _cryptoJs2.default.enc.Base64.parse(_constants2.default.IV);
const passportCode = _constants2.default.PASSPORTCODE;

function decryptCode(code) {
  const decrypted = _cryptoJs2.default.AES.decrypt(code, passportCode, { iv });
  return decrypted.toString(_cryptoJs2.default.enc.Utf8);
}

function signIn(req, res, next) {
  res.status(200).json(req.user.toAuthJSON());
  return next();
}

async function listUsers(req, res) {
  try {
    const users = await _User2.default.listUsers();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function detailUser(req, res) {
  try {
    const user = await _User2.default.findById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function updateUser(req, res) {
  try {
    const user = await _User2.default.findById(req.params.id);
    const images = user.avatar;
    _fs2.default.unlink(`./src/uploads/avatars/${images}`, err => {
      if (err) throw err;
    });
    Object.keys(req.body).forEach(item => {
      user[item] = req.body[item];
    });
    return res.status(200).json((await user.save()));
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await _User2.default.findById(req.params.id);
    const images = user.avatar;
    _fs2.default.unlink(`./src/uploads/avatars/${images}`, err => {
      if (err) throw err;
    });
    await user.remove();
    // return res.sendStatus(200);
    return res.status(200).json('success');
  } catch (e) {
    return res.status(400).json(e);
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("open-graph-scraper");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })
/******/ ]);