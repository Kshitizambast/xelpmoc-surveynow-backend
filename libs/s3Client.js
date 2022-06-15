// import { S3Client } from "@aws-sdk/client-s3";

const { S3Client } = require("@aws-sdk/client-s3");

require("dotenv").config();
const accessKeyId = process.env.AWS_ACCESS_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_REGION;
// const bucketName = process.env.S3_BUCKET;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

module.exports = s3Client;
