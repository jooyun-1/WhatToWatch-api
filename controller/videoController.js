const db = require("../models");
const sequelize = require("sequelize");
const videogenre = db.VideoGenre;
const video = db.Video;
const videoApi = require("../api/videoAPI");

const addVideoGenres = async (req, res) => {
  try {
    const result = await videoApi.getVideoGenres();
    for (let i = 0; i < result.length; i++) {
      await videogenre.create({
        genre_id: result[i].id,
        genre_name: result[i].snippet.title,
      });
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getVideoGenres = async (req, res) => {
  try {
    const videoGenreList = await videogenre.findAll();
    res.status(200).json({ videoGenreList });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const addVideos = async (req, res) => {
  try {
    const videoList = await videoApi.getVideos(null);
    const genres = await videoApi.getVideoGenres();
    const link = "https://www.youtube.com/watch?v=";
    for (let i = 0; i < videoList.length; i++) {
      for (let j = 0; j < genres.length; j++) {
        if (genres[j].id == videoList[i].snippet.categoryId) {
          videoList[i].snippet.genre_name = genres[j].snippet.title;
        }
      }
      await video.create({
        title: videoList[i].snippet.title,
        genre_name: videoList[i].snippet.genre_name,
        thumbnails: videoList[i].snippet.thumbnails.high.url,
        url: link + videoList[i].id,
      });
    }
    res.status(200).json({ videoList });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getVideos = async (req, res) => {
  const genre = req.query.genre;
  try {
    const list = await video.findAll({
      where: {
        genre_name: genre,
      },
    });
    res.status(200).json({ list });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videoList = await video.findAll({
      limit: 20,
    });
    res.status(200).json({ videoList });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const recommendVideos = async (req, res) => {
  // if (req.session && req.session.user) {
  const genres = req.query.genres;
  const genreArray = genres.split(",");
  const videoList = [];
  for (let i = 0; i < genreArray.length; i++) {
    const videoData = await video.findAll({
      order: [sequelize.literal("rand()")],
      limit: 6,
      where: {
        genre_name: {
          [sequelize.Op.substring]: genreArray[i],
        },
      },
    });
    videoList.push(...videoData);
  }
  res.status(200).json({ videoList });
  // } else {
  //   res.status(401).send("not login");
  // }
};
module.exports = {
  getVideoGenres,
  addVideoGenres,
  addVideos,
  getVideos,
  recommendVideos,
  getAllVideos,
};
