import express from 'express';
import authRouter from './auth.route';
import imagesRouter from './images.route';
import { usersController } from '../controllers';
import config from '../config/config';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/images', imagesRouter);

router.get('/', (_, res) => res.json({ message: 'Hello World!' }));
router.get('/is-offline', (_, res) => res.json({ message: `Is offline: ${config.isOffline === 'true'}` }));
router.get('/users/', usersController.getUsers);
router.get('/users/:userId', usersController.getUser);

export default router;
