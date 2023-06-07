const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(
  {
    ...require("../config/config.js")[env],
    dialect: "mysql", // 사용할 데이터베이스 종류 명시
  }
  // config.username,
  // config.database,
  // config.password,
  // config.host,
  // config.dialect,
  // config
);
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require("./user")(sequelize, DataTypes);
const Genre = require("./genre")(sequelize, DataTypes);
const Movie = require("./movie")(sequelize, DataTypes);
const Ott = require("./ott")(sequelize, DataTypes);
const TvShow = require("./tvshow")(sequelize, DataTypes);
const TVGenre = require("./tvgenre")(sequelize, DataTypes);
const VideoGenre = require("./videogenre")(sequelize, DataTypes);
const Video = require("./video")(sequelize, DataTypes);
const Board = require("./board")(sequelize, DataTypes);

db.User = User;
db.Genre = Genre;
db.Movie = Movie;
db.Ott = Ott;
db.TvShow = TvShow;
db.TVGenre = TVGenre;
db.VideoGenre = VideoGenre;
db.Video = Video;
db.Board = Board;

// User.hasMany(Board, {
//   foreignkey: "fk_user_id",
//   sourceKey: "id",
// });

// Board.belongsTo(User, {
//   foreignkey: "fk_user_id",
//   targetkey: "id",
//   onDelete: "CASCADE",
// });
//연결이 잘 되었는지 확인
// Sequelize가 초기화 될 때 DB에 필요한 테이블을 생성하는 함수 (sequelize.sync)
sequelize
  .sync({ alter: true }) //force : 서버실행 시마다, 테이블을
  //재생성 할것인지?
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
