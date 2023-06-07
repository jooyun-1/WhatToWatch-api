const router = require("express").Router();
const movieController = require("../controller/movieController");

router.post("/genres", movieController.addMoviegenres);
router.get("/genres", movieController.getMoviegenres);

router.post("/movies", movieController.addMovies);
router.get("/movies", movieController.getMovies);

router.get("/recommend-movies", movieController.recommendMovies);
router.get("/movies/top20", movieController.getTop20);

module.exports = router;
