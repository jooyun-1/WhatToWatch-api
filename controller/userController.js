const { Session } = require("express-session");
const db = require("../models");
const user = db.User;
// const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const sessionStore = new SequelizeStore({
//   db: db.sequelize,
// });
// app.use(
//   session({
//     secret: "my-secret",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//       httpOnly: true,
//       sameSite: "none",
//       maxAge: 5300000,
//       secure: true,
//     },
//   })
// );
// sessionStore.sync();

const addUser = async (req, res) => {
  const { email, password, username, genres, ott, subcategory } = req.body;
  try {
    const checkDuplicateEmail = await user.count({
      where: {
        email,
      },
    });
    if (checkDuplicateEmail == 0) {
      const result = await user.create({
        email,
        password,
        username,
        genres,
        ott,
        subcategory,
      });

      res.status(200).json({ result });
    } else {
      res.status(500).json("Email is duplicated");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.session.isLogined);
  if (!req.session.isLogined) {
    const result = await user.findOne({
      where: {
        email,
        password,
      },
    });
    if (result) {
      req.session.user = result;
      req.session.isLogined = true;
      req.session.save(() => {
        // res.redirect("/");
      });
      res.status(200).json({ user: result, success: true });
      // console.log(req.session.user);
    } else {
      res.status(500).json("login fail");
    }
    console.log(req.session.isLogined);
  } else {
    res.status(500).json({ success: false });
  }
};

const logout = async (req, res) => {
  if (req.session.user) {
    console.log("로그아웃");

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: true });
      }
    });
  } else {
    console.log("not login");
    res.send({ success: false });
  }
};
const getUser_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await user.findOne({
      where: {
        email,
        password,
      },
    });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const changePassword_OAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await user.update(
      {
        password: password,
      },
      {
        where: {
          email: email,
        },
      }
    );
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const changePassword = async (req, res) => {
  const after_password = req.body.after_password;

  if (req.session && req.session.user) {
    try {
      const result = await user.update(
        {
          password: after_password,
        },
        {
          where: {
            email: req.session.user.email,
            password: req.session.user.password,
          },
        }
      );
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ err });
    }
  } else {
    req.status(401).json("Not Login");
  }
};

const changeMyGenres = async (req, res) => {
  const genres = req.body.genres;
  if (req.session) {
    try {
      const result = await user.update(
        {
          genres: genres,
        },
        {
          where: {
            id: req.session.user.id,
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

const changeMyOTTs = async (req, res) => {
  const otts = req.body.otts;
  if (req.session) {
    try {
      const result = await user.update(
        {
          ott: otts,
        },
        {
          where: {
            id: req.session.user.id,
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

module.exports = {
  addUser,
  getUser_login,
  changePassword_OAuth,
  changePassword,
  login,
  logout,
  changeMyGenres,
  changeMyOTTs,
};
