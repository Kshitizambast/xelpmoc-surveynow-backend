"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SurveyData", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,

      },
      name: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.STRING,
      },
      sex: {
        type: Sequelize.STRING,
      },
      location_coordinates: {
       type: Sequelize.STRING,
      },
      vote_for: {
        type: Sequelize.STRING,
      },
      reason_behind_selection: {
        type: Sequelize.STRING,
      },
      consider_other_option: {
        type: Sequelize.STRING,
      },
      reason_behind_other_option: {
        type: Sequelize.STRING,
      },
      happy_with_current_gov: {
        type: Sequelize.STRING,
      },
      reason_behind_feedback: {
        type: Sequelize.STRING,
      },
      JMR_critic: {
        type: Sequelize.STRING,
      },
      CBN_critic: {
        type: Sequelize.STRING,
      },
      NL_critic: {
        type: Sequelize.STRING,
      },
      local_mla_critic: {
        type: Sequelize.STRING,
      },
      reason_behind_mla_critic: {
        type: Sequelize.STRING,
      },
      choose_next_mla: {
        type: Sequelize.STRING,
      },
      influenced_by: {
        type: Sequelize.STRING,
      },
      expectations_from_next_gov: {
        type: Sequelize.STRING,
      },
      message_for_politicians: {
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
    await queryInterface.dropTable("SurveyData");
  },
};
