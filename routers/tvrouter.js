const router = require("express").Router();
const tvController = require("../controller/tvController");

router.post("/tvgenres", tvController.addTVgenres);
router.get("/tvgenres", tvController.getTVgenres);

router.post("/tvshows", tvController.addTVShows);
router.get("/tvshows", tvController.getTVShows);

router.get("/recommend-tvshows", tvController.recommendTVShows);
router.get("/tvshows/top20", tvController.getTop20);
module.exports = router;
