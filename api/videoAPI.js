const axios = require("axios");
// const youtube = require("../config/youtube");
require("dotenv").config();
const youtube_api_key = process.env.YOUTUBE_API_KEY;

async function getVideoGenres() {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videoCategories?",
      {
        params: {
          part: "snippet",
          regionCode: "KR",
          hl: "ko",
          key: youtube_api_key,
        },
      }
    );
    return response.data.items;
  } catch (err) {
    console.log(err);
  }
}
const videoList = [];
async function getVideos(pageToken = null) {
  const params = {
    part: "snippet",
    regionCode: "KR",
    hl: "ko",
    chart: "mostPopular",
    maxResults: 25,
    key: youtube_api_key,
  };

  if (pageToken != null) {
    params.pageToken = pageToken;
  }

  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos?",
    {
      params: params,
    }
  );
  videoList.push(...response.data.items);

  if (response.data.nextPageToken) {
    await getVideos(response.data.nextPageToken);
  }
  if (response.data.pageInfo.totalResults == videoList.length) {
    return videoList;
  }
}
module.exports = { getVideoGenres, getVideos };
