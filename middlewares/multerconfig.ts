// @ts-nocheck

import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }, 
  
});

const upload = multer({ storage, limits: {
  fileSize: 1000 * 1000 *12, // 12 MB
}, });

export default upload;