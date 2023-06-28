import express from 'express';
import { imagesController } from '../controllers';

const router = express.Router();

router.post('/', imagesController.uploadImage);

export default router;
