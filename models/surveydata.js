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
      // question_id: DataTypes.INTEGER,
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      location_coordinates: DataTypes.STRING,
      name: DataTypes.STRING,
      age: DataTypes.STRING,
      sex: DataTypes.STRING,
      vote_for: DataTypes.STRING,
      reason_behind_selection: DataTypes.STRING,
      consider_other_option: DataTypes.STRING,
      reason_behind_other_option: DataTypes.STRING,
      happy_with_current_gov: DataTypes.STRING,
      reason_behind_feedback: DataTypes.STRING,
      JMR_critic: DataTypes.STRING,
      CBN_critic: DataTypes.STRING,
      NL_critic: DataTypes.STRING,
      local_mla_critic: DataTypes.STRING,
      reason_behind_mla_critic: DataTypes.STRING,
      choose_next_mla: DataTypes.STRING,
      influenced_by: DataTypes.STRING,
      expectations_from_next_gov: DataTypes.STRING,
      message_for_politicians: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SurveyData",
    }
  );
  return SurveyData;
};
