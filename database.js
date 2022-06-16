const { Sequelize } = require('sequelize');
const process = require('dotenv').config();
const surveyerModel = require('./models/surveyer');
const surveyDataModel = require('./models/surveydata');
const questionModel = require('./models/question');


// console.log(process.parsed);
const sequelize = new Sequelize( process.parsed.DATABASE_NAME, process.parsed.DATABASE_USER, process.parsed.DATABASE_PASSWORD, {
    host: process.parsed.DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
    
});

const models = {
    Surveyer: surveyerModel(sequelize, Sequelize.DataTypes),
    SurveyData: surveyDataModel(sequelize, Sequelize.DataTypes),
    Question:  questionModel(sequelize, Sequelize.DataTypes),
}

module.exports = sequelize;
