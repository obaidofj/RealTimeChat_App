// @ts-nocheck

import { S3Client} from "@aws-sdk/client-s3";
import '../configEnv.js';

const s3Connect = (req, res, next) => {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION_S3,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  req.s3Client = s3Client;
  next();
};

export {
  s3Connect
}