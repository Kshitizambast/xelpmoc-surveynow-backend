const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const multer = require("multer");
const multerS3 = require("multer-s3");

require("dotenv").config();
const uploadSurveyData = require("../controller/uploadDataController");
const authMiddleware = require("../middleware/authMiddleware");
const s3Client = require("../libs/s3Client");

var _uuid = uuid.v4();

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${_uuid}/${file.originalname}`);
    },
  }),
});

router.use(bodyParser.json());
router.use(cors());

// Store Audio file in S3 and url in database
router.post(
  "/upload",
  authMiddleware.autherizeUser(),
  upload.array("audio", 10),
  (req, res) => {
    uploadSurveyData.upload(req, res);
  }
);

router.post("/uploadtest", upload.array("audio", 2), (req, res) => {
  res.send(req.files);
});

module.exports = router;
