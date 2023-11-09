// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import path from "path";
import fs from 'fs';
import express from 'express';
import {   PutObjectCommand, ListObjectsCommand ,GetObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();

export const fileController = {
    // get file
 getFile: async (req, res, next) => {
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
    },

 getS3File : async (req, res, next) => {
       try {
        
        const { key } = req.params;
           
    // const fileName = req.params.name?.toString() || '';
    // console.log(key);


    const s3 = req.s3Client;

    const command = new GetObjectCommand({
      Bucket: 'chatappattach', // Replace with your S3 bucket name
      Key: key, // The key of the specific file you want to retrieve
    });

    const response = await s3.send(command);

    // Set the Content-Type header to the response's ContentType
    res.setHeader('Content-Type', response.ContentType);

    // Create a buffer from the file data
    const fileBuffer = await streamToBuffer(response.Body);

    // Send the buffer as the response
    res.send(fileBuffer);
  } catch (error) {
    console.error('Error retrieving file from S3:', error);
    res.status(500).send('Error retrieving file from S3');
  }
},

    
} // end fileController

// Helper function to convert a stream to a buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (error) => reject(error));
  });
}


export default router;