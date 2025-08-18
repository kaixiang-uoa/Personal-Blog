import { S3Client } from "@aws-sdk/client-s3";
import { validateS3Config } from "../utils/s3ConfigValidator.js";
import dotenv from "dotenv";

// Load environment variables in this module
dotenv.config();

const s3Config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION || "us-east-1",
};

const bucketConfig = {
  bucketName: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_REGION || "us-east-1",
};

let s3;
if (process.env.AWS_ACCESS_KEY_ID) {
  try {
    validateS3Config(s3Config);
    s3 = new S3Client(s3Config);
  } catch (error) {
    s3 = null;
  }
} else {
  s3 = null;
}

export { s3, s3Config, bucketConfig };
