const express = require("express");
const router = express.Router();
const AuthRouter = require("./auth");
const SurveyRouter = require("./surveydata");
const cors = require("cors");
const authMiddleware = require("../middleware/authMiddleware");

router.use(cors());

router.use("/auth", AuthRouter);
router.use("/surveydata", SurveyRouter);

module.exports = router;
