const db = require("../models");
const ott = db.Ott;
const ottAPI = require("../api/ottAPI");

const addOTTs = async (req, res) => {
  const ottList = await ottAPI.getOTTS();
  for (let i = 0; i < ottList.length; i++) {
    const ottData = {
      provider_id: ottList[i].provider_id,
      provider_name: ottList[i].provider_name,
      logo_path: `http://image.tmdb.org/t/p/w500${ottList[i].logo_path}`,
    };
    // res.send(ottData);
    await ott.upsert(ottData);
  }
};

const getOTTs = async (req, res) => {
  const ottList = await ott.findAll();
  res.send(ottList);
};

module.exports = { addOTTs, getOTTs };
