const passport = require("passport");
// const googleCredentials = require("../config/google.json");
require("dotenv").config();
const id = process.env.GOOGLE_ID;
const secret = process.env.GOOGLE_SECRET;
const cbUrl = process.env.GOOGLE_CALLBACKURL;

const db = require("../models");
const User = db.User;

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: id,
      clientSecret: secret,
      callbackURL: cbUrl,
      scope: ["profile", "email"],
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate({
        where: {
          email: profile._json.email,
          password: profile.id,
        },
      }).then((user) => {
        return cb(null, user);
      });
    }
  )
);

// 세션에 저장할 데이터를 지정합니다.
passport.serializeUser(function (user, done) {
  done(null, user);
});

// 세션에서 데이터를 읽어올 때 사용합니다.
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
