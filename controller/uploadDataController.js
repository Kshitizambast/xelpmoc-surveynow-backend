const uuid = require("uuid");

const sequelize = require("../database");
const s3Client = require("../libs/s3Client");
const verifyToken = require("../utils/jwtUtils").verifyToken;

module.exports = {
  uploadDataController: (req, res) => {
    res.send("uploadDataController");
  },

  upload: async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    req.user = verifyToken(token);
    const surveyer_id = req.user.id;

    const { question_one_answer, question_two_answer, location_coordinates } =
      req.body;

    let key = req.files[0].key;
    const _uuid = key.split("/")[0];

    await sequelize.models.SurveyData.create({
      uuid: _uuid,
      surveyer_id,
      participant_data_recording_url: req.files[0].location,
      location_coordinates,
      participant_review_recording_url: req.files[1].location,
      question_one_answer,
      question_two_answer,
    })
      .then((surveyData) => {
        res.status(200).json(surveyData);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  uploadAudioFiles: async (audioFile, filename) => {
    await s3Client
      .uploadToBucket(audioFile, filename)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
};
