const axios = require("axios");
require("dotenv").config();
const tdmb_api_key = process.env.TDMB_API_KEY;
const ottAPI = require("./ottAPI");

async function getShows() {
  try {
    const allshows = [];
    const otts = await ottAPI.getOTTS();

    for (let i = 0; i < otts.length; i++) {
      const ott = otts[i];
      const shows = [];

      for (let page = 1; page <= 30; page++) {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/tv",
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

        shows.push(...response.data.results);
      }
      let allgenres = await getTVgenres();

      for (let j = 0; j < shows.length; j++) {
        shows[
          j
        ].backdrop_path = `https://image.tmdb.org/t/p/w500${shows[j].backdrop_path}`;
        shows[
          j
        ].poster_path = `https://image.tmdb.org/t/p/w500${shows[j].poster_path}`;
        genre_names = [];
        if (ott.provider_id === 8) {
          shows[j].provider_name = "Netflix";
        } else if (ott.provider_id === 337) {
          shows[j].provider_name = "Disney Plus";
        }
        for (let id of shows[j].genre_ids) {
          for (let genre of allgenres) {
            if (id === genre.id) {
              genre_names.push(genre.name);
            }
          }
        }
        shows[j].genre_names = genre_names;
      }
      allshows.push(...shows);
    }

    return allshows;
  } catch (error) {
    console.error(error);
  }
}

async function getTVgenres() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${tdmb_api_key}&language=ko`
    );
    return response.data.genres;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getShows, getTVgenres };
