const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

const uploadSurveyData = require("../controller/uploadDataController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadAudio = require("../middleware/uploadAudio").uploadAudio();

router.use(bodyParser.json());
router.use(cors());

router.get("/surveyuuid", authMiddleware.autherizeUser(), (req, res) => {
  uploadSurveyData.createSurvey(req, res);
});

router.get("/my-survey-data", authMiddleware.autherizeUser(), (req, res) => {
  uploadSurveyData.getSurveyData(req, res);
})

router.post(
  "/upload-audio/:uuid/:filename",
  authMiddleware.autherizeUser(),
  uploadAudio,
  (req, res) => {
    uploadSurveyData.uploadAudio(req, res);
  }
);

router.post("/upload-data", authMiddleware.autherizeUser(), (req, res) => {
  uploadSurveyData.upload(req, res);
});

router.delete(
  "/delete-data/:uuid/",
  authMiddleware.autherizeUser(),
  (req, res) => {
    uploadSurveyData.deleteSurveyData(req, res);
  }
);

// router.post("/uploadtest", upload.array("audio", 2), (req, res) => {
//   res.send(req.files);
// });

module.exports = router;
