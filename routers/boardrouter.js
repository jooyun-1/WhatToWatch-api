const router = require("express").Router();
const boardController = require("../controller/boardController");
const board = require("../models/board");

router.post("/board/posts", boardController.addPost);
router.put("/board/posts", boardController.updatePosts);
router.delete("/board/posts", boardController.deletePosts);
router.get("/board/posts", boardController.getPosts);

router.get("/board/detail", boardController.getPostsDetail);
module.exports = router;
