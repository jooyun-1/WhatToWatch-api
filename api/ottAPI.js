const axios = require("axios");
require("dotenv").config();
const tdmb_api_key = process.env.TDMB_API_KEY;

async function getOTTS() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/watch/providers/movie?api_key=${tdmb_api_key}&language=ko&watch_region=KR`
    );
    const otts = [];
    let allotts = response.data.results;
    for (let ott of allotts) {
      if (
        ott.provider_name === "Netflix" ||
        ott.provider_name === "Disney Plus"
      ) {
        otts.push(ott);
      }
    }
    return otts;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getOTTS };
