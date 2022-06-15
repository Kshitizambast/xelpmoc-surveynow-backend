const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const surveyerController = require("../controller/surveyerController");

router.use(bodyParser.json());
router.use(cors());

router.get("/", (req, res) => {
  surveyerController.surveyerController(req, res);
});

router.post("/signup", (req, res) => {
  surveyerController.surveyerCreate(req, res);
});
router.post("/login", (req, res) => {
  surveyerController.surveyerLogin(req, res);
});

module.exports = router;
