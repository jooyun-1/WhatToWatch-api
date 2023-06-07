const db = require("../models");
const tvgenre = db.TVGenre;
const tvShow = db.TvShow;
const tvAPI = require("../api/tvAPI");
const sequelize = require("sequelize");

const addTVShows = async (req, res) => {
  const showsList = await tvAPI.getShows();
  console.log(showsList);
  if (showsList === undefined || showsList.length <= 0) return;

  for (let i = 0; i < showsList.length; i++) {
    const showData = {
      title: showsList[i].name,
      genres: showsList[i].genre_names,
      poster_img: showsList[i].poster_path,
      backdrop_path: showsList[i].backdrop_path,
      overview: showsList[i].overview,
      vote_average: showsList[i].vote_average,
      first_air_date: showsList[i].first_air_date,
      popularity: showsList[i].popularity,
      provider_name: showsList[i].provider_name,
    };
    await tvShow.upsert(showData);
  }
};

const getTVShows = async (req, res) => {
  const genre = req.query.genre;
  // const currentPage = req.query.currentPage;
  // const pageSize = 9;
  // const offset = (currentPage - 1) * pageSize;

  const list = await tvShow.findAll({
    order: [["popularity", "desc"]],
    where: sequelize.where(
      sequelize.fn("JSON_CONTAINS", sequelize.col("genres"), `"${genre}"`),
      true
    ),
  });
  // const maxPage = Math.ceil(showsList.length / pageSize);
  res.status(200).json({ list });
};

const recommendTVShows = async (req, res) => {
  // if (req.session && req.session.user) {
  const genres = req.query.genres;
  const genreArray = genres.split(",");
  const tvList = [];
  for (let i = 0; i < genreArray.length; i++) {
    const tvData = await tvShow.findAll({
      order: [sequelize.literal("rand()")],
      limit: 6,
      where: sequelize.where(
        sequelize.fn(
          "JSON_CONTAINS",
          sequelize.col("genres"),
          // `"${genres[i]}"`
          JSON.stringify(genreArray[i])
        ),
        true
      ),
    });
    tvList.push(...tvData);
  }
  res.status(200).json({ tvList });
  // } else {
  //   res.status(401).send("not login");
  // }
};

const addTVgenres = async (req, res) => {
  const genresList = await tvAPI.getTVgenres();
  for (let i = 0; i < genresList.length; i++) {
    const genreData = {
      genre_name: genresList[i].name,
    };
    await tvgenre.upsert(genreData);
  }
};

const getTVgenres = async (req, res) => {
  const genresList = await tvgenre.findAll();
  res.status(200).json({ genresList });
};

const getTop20 = async (req, res) => {
  const provider_name = req.query.provider_name;

  const showsList = await tvShow.findAll({
    limit: 20,
    order: [["popularity", "desc"]],
    where: {
      provider_name: provider_name,
    },
  });
  res.status(200).json({ showsList });
};
module.exports = {
  addTVShows,
  addTVgenres,
  getTVgenres,
  getTVShows,
  recommendTVShows,
  getTop20,
};
