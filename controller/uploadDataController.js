const globalUuid = require("uuid");

const sequelize = require("../database");
const s3Client = require("../libs/s3Client");
const verifyToken = require("../utils/jwtUtils").verifyToken;

module.exports = {
  createSurvey: async (req, res) => {
    var _uuid = globalUuid.v4();
    res.status(200).json({
      message: "Survey created",
      uuid: _uuid,
    });
  },

  uploadAudio: (req, res) => {
    res.status(200).json({
      message: "Audio file uploaded successfully",
      url: req.file.location,
    });
  },

  upload: async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    req.user = verifyToken(token);

    const {
      uuid,
      name,
      age,
      sex,
      vote_for,
      location_coordinates,
      reason_behind_selection,
      consider_other_option,
      reason_behind_other_option,
      happy_with_current_gov,
      reason_behind_feedback,
      JMR_critic,
      CBN_critic,
      NL_critic,
      local_mla_critic,
      reason_behind_mla_critic,
      choose_next_mla,
      influenced_by,
      expectations_from_next_gov,
      message_for_politicians,
    } = req.body;

    // console.log(req.body);

    await sequelize.models.SurveyData.findOne({
      where: {
        uuid: uuid,
      },
    })
      .then(async (surveyData) => {
        if (surveyData) {
          res.status(400).json({
            message: "Survey data already exists",
          });
        } else {
          await sequelize.models.SurveyData.create({
            uuid,
            name,
            age,
            sex,
            vote_for,
            location_coordinates,
            reason_behind_selection,
            consider_other_option,
            reason_behind_other_option,
            happy_with_current_gov,
            reason_behind_feedback,
            JMR_critic,
            CBN_critic,
            NL_critic,
            local_mla_critic,
            reason_behind_mla_critic,
            choose_next_mla,
            influenced_by,
            expectations_from_next_gov,
            message_for_politicians,
          })
            .then(async (surveyData) => {
              const collection_uuid = globalUuid.v4();
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
                    message: "Error creating surveyer collection",
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                message: "Error creating survey data",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: "Try again later",
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
        res.status(200).json({
          message: "Survey data retrieved",
          total: surveyerCollections.length,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  deleteAudio: async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    req.user = verifyToken(token);

    const { uuid, filename } = req.params;
    await sequelize.models.SurveyData.findOne({
      where: {
        uuid,
      },
    })
      .then(async (surveyData) => {
        await s3Client
          .deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: `${surveyData.uuid}/${filename}`,
          })
          .promise()
          .then(() => {
            res.status(200).json({
              message: "Audio file deleted successfully",
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

  deleteSurveyData: async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    req.user = verifyToken(token);

    const { uuid } = req.params;

    await sequelize.models.SurveyData.destroy({
      where: {
        uuid,
      },
    })
      .then((surveyData) => {
        res.status(200).json({
          message: "Survey data deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};
