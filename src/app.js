/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
// import validator from 'express-validator';
import cookieParser from 'cookie-parser';
import constants from './config/constants';
import middleware from './config/middleware';
import apiRoutes from './modules';

const app = express();
app.use(cookieParser());
// NOTE: Setup Database
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
try {
  mongoose.connect(constants.MONGO_URL, {
    useMongoClient: true,
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, {
    useMongoClient: true,
  });
}
mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
      throw e;
    });

// NOTE: Setting url public
app.use('/images', express.static('src/uploads'))
// NOTE: Setup Middleware
middleware(app);
// NOTE: Setup Router
// app.use(validator());
apiRoutes(app);

// app.use(express.static(path.join(__dirname, 'src/views'))); --> not working
app.use(express.static('src/views'));
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'index.html'));
});
// http://localhost:4600/index.html

app.get('/page', (req, res) => {
  return res.sendFile(path.join(__dirname, 'login-page.html'));
});
// http://localhost:4600/page.html

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// NOTE: Setup Server
 app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server Running On Port : ${constants.PORT} With ${process.env.NODE_ENV}`);
  }
});

