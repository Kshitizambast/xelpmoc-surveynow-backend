const sequelize = require("../database");



module.exports = {

    getQuestions: async (req, res) => {
        await sequelize.models.Question.findAll().then((questions) => {
            res.status(200).json(questions);
        }
        ).catch((err) => {
            res.status(500).json({
                error: err,
            });
        }
        );
    }
            
}
