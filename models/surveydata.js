"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SurveyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SurveyData.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      surveyer_id: DataTypes.STRING,
      participant_data_recording_url: DataTypes.STRING,
      location_coordinates: DataTypes.STRING,
      participant_review_recording_url: DataTypes.STRING,
      question_one_answer: DataTypes.STRING,
      question_two_answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SurveyData",
      tableName: "survey_data",
    }
  );
  return SurveyData;
};
