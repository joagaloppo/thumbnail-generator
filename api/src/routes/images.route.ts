import express from 'express';
import passport from 'passport';
import { imagesController } from '../controllers';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), imagesController.uploadImage);

export default router;
