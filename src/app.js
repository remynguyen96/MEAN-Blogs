/* eslint-disable no-console */
import express from 'express';
import constants from './config/constants';
import mongoose from 'mongoose';
import middleware from './config/middleware';

const app = express();
// NOTE: Setup Database
mongoose.Promise = global.Promise;
try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}
mongoose.connection
        .once('open', () => console.log('      MongoDB Running'))
        .on('error', console.error.bind(console, 'MongoDB connection error: '));
// NOTE: Setup Middleware
middleware(app);
// NOTE: Setup Server
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server Running On Port : ${constants.PORT} With ${process.env.NODE_ENV}
    `);
  }
});
