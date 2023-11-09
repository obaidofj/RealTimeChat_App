// @ts-nocheck
// to be able to deploy successfully to ecs and ec2

import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },

});

const upload = multer({
  storage, limits: {
    fileSize: 1000 * 1000 * 12, // 12 MB
  },
});

export const uploadS3 = multer({
  storage: multer.memoryStorage (),
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB file size limit
});

export default upload;