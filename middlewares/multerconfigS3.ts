import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';


const s3 = new AWS.S3();

// Configure multer to use multer-s3 storage
const s3Storage = multerS3({
  s3: s3,
  bucket: 'chatappattach',
  acl: 'public-read', // Set the appropriate ACL
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const s3Upload = multer({
  storage: s3Storage,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB file size limit
});

export default s3Upload;