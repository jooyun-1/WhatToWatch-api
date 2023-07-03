const router = require("express").Router();
const videoController = require("../controller/videoController");

router.post("/video-genres", videoController.addVideoGenres);
router.get("/video-genres", videoController.getVideoGenres);

router.post("/videos", videoController.addVideos);
router.get("/videos", videoController.getVideos);
router.get("/recommend-videos", videoController.recommendVideos);
router.get("/top20videos", videoController.getTop20Videos);

module.exports = router;
