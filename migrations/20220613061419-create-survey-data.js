"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("survey_data", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      surveyer_id: {
        type: Sequelize.STRING,
      },
      participant_data_recording_url: {
        type: Sequelize.STRING,
      },
      location_coordinates: {
        type: Sequelize.STRING,
      },
      participant_review_recording_url: {
        type: Sequelize.STRING,
      },
      question_one_answer: {
        type: Sequelize.STRING,
      },
      question_two_answer: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("survey_data");
  },
};
