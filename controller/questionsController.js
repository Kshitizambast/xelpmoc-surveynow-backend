const sequelize = require("../database");

module.exports = {
  getQuestions: async (req, res) => {
    await sequelize.models.Question.findAll()
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  createQustion: async (req, res) => {
    const {
      question,
      answer_type,
      alias,
      option_one,
      option_two,
      option_three,
    } = req.body;
    await sequelize.models.Question.create({
      question,
      answer_type,
      alias,
      option_one,
      option_two,
      option_three,
    })
      .then((question) => {
        res.status(200).json(question);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};
