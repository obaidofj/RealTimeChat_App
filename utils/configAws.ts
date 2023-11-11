// @ts-nocheck
import AWS from '@aws-sdk/client-ses';

const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION_SES, // Replace with the appropriate AWS region
});

export default ses; 
