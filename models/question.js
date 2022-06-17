'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    question: DataTypes.STRING,
    answer_type: DataTypes.STRING,
    alias: DataTypes.STRING,
    option_one: DataTypes.STRING,
    option_two: DataTypes.STRING,
    option_three: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};