const db = require("../models");
const sequelize = require("sequelize");
const genre = db.Genre;
const movie = db.Movie;

const movieAPI = require("../api/movieAPI");

const addMovies = async (req, res) => {
  const moviesList = await movieAPI.getMovies();
  if (moviesList === undefined || moviesList.length <= 0) return;

  for (let i = 0; i < moviesList.length; i++) {
    const movieData = {
      title: moviesList[i].title,
      genres: moviesList[i].genre_names,
      vote_average: moviesList[i].vote_average,
      poster_img: moviesList[i].poster_path,
      backdrop_path: moviesList[i].backdrop_path,
      overview: moviesList[i].overview,
      release_date: moviesList[i].release_date,
      popularity: moviesList[i].popularity,
      provider_name: moviesList[i].provider_name,
    };
    await movie.upsert(movieData);
  }
};

// async function getMaxPageForMovies(list, pageSize) {
//   return Math.ceil(list.length / pageSize);
// }

const getMovies = async (req, res) => {
  const genre = req.query.genre;
  // const currentPage = req.query.currentPage;
  // const pageSize = 9;
  // const offset = (currentPage - 1) * pageSize;

  if (!genre) {
    return res.status(400).send("genre is missing");
  }

  const list = await movie.findAll({
    order: [["popularity", "desc"]],
    where: sequelize.where(
      sequelize.fn(
        "JSON_CONTAINS",
        sequelize.col("genres"),
        JSON.stringify(genre)
      ),
      true
    ),
  });
  // const maxPage = Math.ceil(moviesList.length / pageSize);
  // moviesList.maxPage = maxPage;
  res.status(200).json({ list });
};

const getTop20 = async (req, res) => {
  const provider_name = req.query.provider_name;

  const moviesList = await movie.findAll({
    limit: 20,
    order: [["popularity", "desc"]],
    where: {
      provider_name: provider_name,
    },
  });
  res.status(200).json({ moviesList });
};

const recommendMovies = async (req, res) => {
  // console.log(req.session.user);
  // if (req.session.user) {
  // const genres = req.session.user.genres;
  const genres = req.query.genres;

  const genreArray = genres.split(",");

  const movieList = [];

  for (let i = 0; i < genreArray.length; i++) {
    const movieData = await movie.findAll({
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

    movieList.push(...movieData);
  }
  res.status(200).json({ movieList });
  // } else {
  //   res.status(401).send("not login");
  // }
};

const addMoviegenres = async (req, res) => {
  const genresList = await movieAPI.getMoviegenres();
  for (let i = 0; i < genresList.length; i++) {
    const genreData = {
      genre_name: genresList[i].name,
    };
    await genre.upsert(genreData);
  }
};

const getMoviegenres = async (req, res) => {
  const genresList = await genre.findAll();
  res.status(200).json({ genresList });
};

module.exports = {
  addMovies,
  addMoviegenres,
  getMoviegenres,
  getMovies,
  recommendMovies,
  getTop20,
};
