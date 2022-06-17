const express = require("express");
const router = express.Router();
const AuthRouter = require("./auth");
const SurveyRouter = require("./surveydata");
const QuestionRouter = require("./question");
const cors = require("cors");
const authMiddleware = require("../middleware/authMiddleware");

router.use(cors());

router.use("/auth", AuthRouter);
router.use("/surveydata", SurveyRouter);
router.use("/question", QuestionRouter);

module.exports = router;
