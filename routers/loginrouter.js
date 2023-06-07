const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/users/login", userController.getUser_login);
router.post("/users/login", userController.login);

router.get("/users/logout", userController.logout);

module.exports = router;
