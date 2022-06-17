const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const questionController = require("../controller/questionsController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(bodyParser.json());
router.use(cors());

router.get("/all", authMiddleware.autherizeUser(), (req, res) => {
  questionController.getQuestions(req, res);
});

module.exports = router;
