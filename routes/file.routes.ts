// @ts-nocheck
// @ts-nocheck
import express from 'express';
import { fileController } from '../controllers/file.controller.js';
import  {s3Connect} from '../middlewares/s3connection.js';



const router = express.Router();

router.get('/:name', fileController.getFile);

router.get('/s3/:key', s3Connect, fileController.getS3File);


export default router;