const axios = require("axios");
const ottAPI = require("./ottAPI");
require("dotenv").config();
const tdmb_api_key = process.env.TDMB_API_KEY;

async function getMovies() {
  try {
    const allmovies = [];
    const otts = await ottAPI.getOTTS();

    for (let i = 0; i < otts.length; i++) {
      const ott = otts[i];
      const movies = [];

      for (let page = 1; page <= 30; page++) {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: tdmb_api_key,
              language: "ko",
              sort_by: "popularity.desc",
              include_adult: false,
              include_video: false,
              page,
              with_watch_monetization_types: "flatrate",
              with_watch_providers: ott.provider_id,
              watch_region: "KR",
            },
          }
        );
        if (response.data.results.length === 0) break;

        movies.push(...response.data.results);
      }
      let allgenres = await getMoviegenres();

      for (let j = 0; j < movies.length; j++) {
        movies[
          j
        ].backdrop_path = `https://image.tmdb.org/t/p/w500${movies[j].backdrop_path}`;
        movies[
          j
        ].poster_path = `https://image.tmdb.org/t/p/w500${movies[j].poster_path}`;
        genre_names = [];
        if (ott.provider_id === 8) {
          movies[j].provider_name = "Netflix";
        } else if (ott.provider_id === 337) {
          movies[j].provider_name = "Disney Plus";
        }
        for (let id of movies[j].genre_ids) {
          for (let genre of allgenres) {
            if (id === genre.id) {
              genre_names.push(genre.name);
            }
          }
        }
        movies[j].genre_names = genre_names;
      }
      allmovies.push(...movies);
    }

    return allmovies;
  } catch (error) {
    console.error(error);
  }
}

async function getMoviegenres() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${tdmb_api_key}&language=ko`
    );
    return response.data.genres;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getMovies, getMoviegenres };
