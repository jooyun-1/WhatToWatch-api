const router = require("express").Router();
const ottController = require("../controller/ottController");

router.post("/ott", ottController.addOTTs);
router.get("/ott", ottController.getOTTs);
module.exports = router;
