// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import path from "path";
import fs from 'fs';
import express from 'express';

const router = express.Router();


router.get('/:name', (req, res, next) => {
  const fileName = req.params.name?.toString() || '';
  console.log(fileName);


  // Validate fileName to prevent directory traversal
  if (fileName.includes('..')) {
    res.status(400).send('Invalid file name');
    return;
  }

  const filePath = path.join('uploads', fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send('File not found');
      } else {
        console.error(err);
        res.status(500).send('Something went wrong');
      }
    } else {
      // Determine the appropriate content type based on the file's extension
      const fileExtension = path.extname(fileName);
      let contentType = 'application/octet-stream'; // Default content type for unknown files

      // switch (fileExtension) {
      //   case '.json':
      //     contentType = 'application/json';
      //     break;
      //   case '.txt':
      //     contentType = 'text/plain';
      //     break;
      //   case '.jpg':
      //   case '.jpeg':
      //     contentType = 'image/jpeg';
      //     break;
      //   case '.png':
      //     contentType = 'image/png'; 
      //     break;
      //   // Add more cases for other file types as needed
      // }

      // Set the appropriate content type header
      res.setHeader('Content-Type', contentType);

      // Send the file as binary data
      res.send(data);
    }
  });
});

export default router;