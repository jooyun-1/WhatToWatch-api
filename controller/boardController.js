const db = require("../models");
const board = db.Board;

const addPost = async (req, res) => {
  const { title, post } = req.body;
  const email = req.session.user.email;
  const userId = req.session.user.id;
  console.log(email, userId);
  try {
    if (req.session && email) {
      const result = await board.create({
        title: title,
        post: post,
        email: email,
        fk_user_id: userId,
      });
      res.status(200).json({ result });
    } else {
      res.status(401).json({ message: "로그인 후 이용해주세요." }); // 로그인이 필요한 경우 에러 메시지를 반환합니다.
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getPosts = async (req, res) => {
  const boardList = await board.findAll();
  if (boardList) {
    res.status(200).json({ boardList });
  } else {
    res.status(500).json({ err });
  }
};

const getPostsDetail = async (req, res) => {
  const id = req.query.id;
  const postDetail = await board.findOne({
    where: {
      id: id,
    },
  });
  if (postDetail) {
    res.status(200).json({ postDetail });
  } else {
    res.status(500).json("fail");
  }
};

const updatePosts = async (req, res) => {
  const { id, title, post } = req.body;
  if (req.session && req.session.user) {
    try {
      const result = await board.update(
        {
          title: title,
          post: post,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ err });
    }
  } else {
    res.status(401).json("Not Login");
  }
};

const deletePosts = async (req, res) => {
  const { id } = req.body;
  if (req.session && req.session.user) {
    try {
      await board.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json({ err });
    }
  } else {
    res.status(401).json("Not Login");
  }
};
module.exports = {
  addPost,
  getPosts,
  updatePosts,
  deletePosts,
  getPostsDetail,
};
