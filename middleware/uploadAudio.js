const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../libs/s3Client");
require("dotenv").config();

module.exports = {
  uploadAudio: () => {
    return (req, res, next) => {
      var { uuid, filename } = req.params;
      const upload = multer({
        storage: multerS3({
          s3: s3Client,
          bucket: process.env.S3_BUCKET,
          metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
          },
          key: function (req, file, cb) {
            cb(null, `${uuid}/${filename}`);
          },
        }),
      });

      const _upload = upload.single("audio");
      _upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error uploading file",
            error: err,
          });
        }
        next();
      });
    };
  },
};
