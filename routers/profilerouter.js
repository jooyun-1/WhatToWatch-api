const router = require("express").Router();
const userController = require("../controller/userController");

router.put("/users/password-oauth", userController.changePassword_OAuth);
router.put("/users/password", userController.changePassword);
router.put("/users/genres", userController.changeMyGenres);
router.put("/users/otts", userController.changeMyOTTs);
module.exports = router;
