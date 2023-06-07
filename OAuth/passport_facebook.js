const passport = require("passport");

const db = require("../models");
const userController = require("../controller/userController");
const User = db.User;

require("dotenv").config();
const id = process.env.FACEBOOK_ID;
const secret = process.env.FACEBOOK_SECRET;
const cbUrl = process.env.FACEBOOK_CALLBACKURL;

const FacebookStrategy = require("passport-facebook").Strategy;
// facebookCredentials.profileFields = ["id", "emails", "name"];

passport.use(
  new FacebookStrategy(
    {
      clientID: id,
      clientSecret: secret,
      callbackURL: cbUrl,
      profileFields: ["id", "emails", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOrCreate({
        where: {
          email: profile._json.email,
          password: profile.id,
        },
      }).then((user) => {
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
