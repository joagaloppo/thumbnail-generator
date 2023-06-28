import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config/config';
import upload from '../config/multer';
import s3 from '../config/bucket';

const { bucketName } = config;

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File size too large.' });
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) return res.status(500).json({ error: 'No file provided.' });

    const uploadParams = {
      ACL: 'public-read',
      Bucket: bucketName,
      Body: req.file.buffer,
      Key: req.file.originalname,
      ContentType: req.file.mimetype,
    };

    try {
      const data = await s3.upload(uploadParams).promise();
      res.json({ message: 'File uploaded successfully.', data });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file to S3.' });
    }

    return null;
  });
});

const imageController = { uploadImage };
export default imageController;
