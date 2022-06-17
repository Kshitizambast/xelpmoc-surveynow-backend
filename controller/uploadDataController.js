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

    const {
      name,
      age,
      sex,
      vote_for,
      location_coordinates,
      consider_other_option,
      happy_with_current_gov,
      local_mla_critic,
      choose_next_mla,
    } = req.body;

    let key = req.files[0].key;
    const _uuid = key.split("/")[0];
    await sequelize.models.SurveyData.create({
      uuid: _uuid,
      name,
      age,
      sex,
      vote_for,
      location_coordinates,
      reason_behind_selection: req.files[0].location || 'Not Found',
      consider_other_option,
      reason_behind_other_option: req.files[1].location || 'Not Found',
      happy_with_current_gov,
      reason_behind_feedback: req.files[2].location || 'Not Found',
      JMR_critic: req.files[3].location || 'Not Found',
      CBN_critic: req.files[4].location || 'Not Found',
      NL_critic: req.files[5].location || 'Not Found',
      local_mla_critic,
      reason_behind_mla_critic: req.files[6].location || 'Not Found',
      choose_next_mla,
      influenced_by: req.files[7].location || 'Not Found',
      expectations_from_next_gov: req.files[8].location || 'Not Found',
      message_for_politicians:  req.files[9].location || 'Not Found',
    })
      .then(async (surveyData) => {

        const collection_uuid = uuid.v4();
        await sequelize.models.SurveyerCollection.create({
          uuid: collection_uuid,
          survey_data_uuid: surveyData.uuid,
          surveyer_uuid: req.user.uuid,
        })
          .then((surveyerCollection) => {
            res.status(200).json({
              surveyData,
              surveyerCollection,
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  getSurveyData: async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    req.user = verifyToken(token);

    await sequelize.models.SurveyerCollection.findAll({
      where: {
        surveyer_uuid: req.user.uuid,
      },
    })
      .then((surveyerCollections) => {
        res.status(200).json(surveyerCollections);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};
