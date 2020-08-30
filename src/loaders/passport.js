/**
 * Passport middleware
 */
const jwt = require("jsonwebtoken");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const config = require("../configs");
const { cryptoPassword } = require("../helpers/commonFunction");
const { getOneWhere } = require("../services/userService");
const { create, getOne } = require("../services/tokenService");
const { omit } = require("lodash");
const {
  INVALID_PASSWORD,
  INVALID_PASSWORD_STUDENT,
  UNAUTHORIZED,
  USER_NOT_FOUND,
  CLASS_CODE_MISSING
} = require("../api/constants/errorMessages");

passport.serializeUser(async (user, done) => {
  // console.log(user.user.id);
  done(null, user.user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/**
 * JWT option
 */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

/**
 * Passport jwt strategy
 */
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
  const user = await getOneWhere({
    id: jwtPayload.id
  });

  if (user) {
    next(null, user[0]);
  } else {
    next({ message: UNAUTHORIZED }, false);
  }
});

/**
 * Passport JWT strategy include in passport
 */
passport.use(jwtStrategy);

/**
 * Passport login local strategy
 */
const loginLocalStrategy = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
    session: false
  },
  async (req, email, password, done) => {
    let field = { email: email };

    let user = await getOneWhere(field);
    user = omit(user[0], ["level"]);
    if (!user) {
      return done({ message: USER_NOT_FOUND }, false);
    }

    const isMatchPassword = password === user.password ? true : false;

    if (isMatchPassword) {
      const tokenObj = {
        user_id: user.id,
        type: "user_login"
      };

      const token = await create(tokenObj);

      const getToken = await getOne(token.insertId);

      return done(null, { user, token: getToken[0]["token"] });
    } else {
      return done({ message: INVALID_PASSWORD }, false);
    }
  }
);
/**
 * Passport student login local strategy
 */
const studentLoginLocalStrategy = new localStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
    session: false
  },
  async (req, username, password, done) => {
    let field = { username: username, class_code: req.body.class_code };

    if (!req.body.class_code) {
      return done({ message: CLASS_CODE_MISSING }, false);
    }

    let user = await getOneWhere(field);

    user = user[0];
    if (!user) {
      return done({ message: USER_NOT_FOUND }, false);
    }

    const isMatchPassword = password === user.password ? true : false;

    if (isMatchPassword) {
      const tokenObj = {
        user_id: user.id,
        type: "user_login"
      };

      const token = await create(tokenObj);

      const getToken = await getOne(token.insertId);

      return done(null, { user, token: getToken[0]["token"] });
    } else {
      return done({ message: INVALID_PASSWORD_STUDENT }, false);
    }
  }
);

/**
 * Passport login local strategy
 */
passport.use("login", loginLocalStrategy);

/**
 * Passport student login local strategy
 */

passport.use("student-login", studentLoginLocalStrategy);

module.exports = passport;
