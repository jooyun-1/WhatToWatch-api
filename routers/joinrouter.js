const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/users/join", userController.addUser);
module.exports = router;
