const router = require("express").Router();
const passport = require("../OAuth/passport_google");
const passportFacebook = require("../OAuth/passport_facebook");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/mypage",
  })
  // function (req, res) {
  //   res.redirect("/test");
  // }
);

router.get(
  "/auth/facebook",
  passportFacebook.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passportFacebook.authenticate("facebook", {
    successRedirect: "/users/login",
    failureRedirect: "/",
  })
);
module.exports = router;
