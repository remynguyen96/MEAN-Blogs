import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../modules/users/User';
import CryptoJS from 'crypto-js';
import constants from './constants';

const iv = CryptoJS.enc.Base64.parse(constants.IV);
const passportCode   = constants.PASSPORTCODE;

function decryptCode(code) {
  const decrypted = CryptoJS.AES.decrypt(code, passportCode, {iv});
  return decrypted.toString(CryptoJS.enc.Utf8);
}

const localOpts = {
  usernameField: 'email',
  // passwordField: 'password',
  // passReqToCallback: true,
};

const localStrategy = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      password = decryptCode(password);
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);
// Jwt strategy

const jwtOpts = {
  // jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
