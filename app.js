const express = require("express");
const app = express();
const PORT = 3100;
const corsOptions = {
  origin: true,
  credentials: true,
};
const cors = require("cors");
const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});
const passport_google = require("./OAuth/passport_google");
const passport_facebook = require("./OAuth/passport_facebook");

const joinRouter = require("./routers/joinrouter");
const loginRouter = require("./routers/loginrouter");
const passportRouter = require("./routers/passportrouter");
const movieRouter = require("./routers/movierouter");
const ottRouter = require("./routers/ottrouter");
const tvRouter = require("./routers/tvrouter");
const profileRouter = require("./routers/profilerouter");
const videoRouter = require("./routers/videorouter");
const boardRouter = require("./routers/boardrouter");

const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      maxAge: 5300000,
      // secure: true,
    },
  })
);
sessionStore.sync();
// sessionStore.on("destroy", (sessionId) => {
//   db.Session.destroy({ where: { sid: sessionId } });
// });
app.use(passport_google.initialize());
app.use(passport_google.session());
app.use(passport_facebook.initialize());
app.use(passport_facebook.session());

app.use(joinRouter);
app.use(loginRouter);
app.use(passportRouter);
app.use(movieRouter);
app.use(ottRouter);
app.use(tvRouter);
app.use(profileRouter);
app.use(videoRouter);
app.use(boardRouter);

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"));
});

// app.get("/", (req, res, next) => {
//   console.log(req.session);
//   res.send(req.session);
// });

app.listen(PORT, async () => {
  console.log("Server running on port 3100");
});
