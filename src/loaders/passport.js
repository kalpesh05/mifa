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

const {
  INVALID_PASSWORD,
  UNAUTHORIZED,
  USER_NOT_FOUND
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
    usernameField: "username",
    passwordField: "password",
    session: false
  },
  async (email, password, done) => {
    let field = email.includes("@") ? { email: email } : { username: email };
    let user = await getOneWhere(field);
    user = user[0];
    if (!user) {
      return done({ message: USER_NOT_FOUND }, false);
    }

    // const { password: saltedPassword } = await cryptoPassword(
    //   user.salt,
    //   password
    // );

    const isMatchPassword = password === user.password ? true : false;
    // console.log(password, user.password);
    if (isMatchPassword) {
      const tokenObj = {
        user_id: user.id,
        type: "user_login"
      };

      const token = await create(tokenObj);
      // console.log(token);
      const getToken = await getOne(token.insertId);
      // console.log(getToken);

      return done(null, { user, token: getToken[0]["token"] });
    } else {
      return done({ message: INVALID_PASSWORD }, false);
    }
  }
);

/**
 * Passport login local strategy
 */
passport.use("login", loginLocalStrategy);

module.exports = passport;
