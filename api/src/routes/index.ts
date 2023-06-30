import express from 'express';
import passport from 'passport';
import authRouter from './auth.route';
import imagesRouter from './images.route';
import { usersController } from '../controllers';
import config from '../config/config';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/images', imagesRouter);

router.get('/', (_, res) => res.json({ message: 'Hello World!' }));
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => res.json(req.user));
router.get('/users/', usersController.getUsers);
router.get('/users/:userId', usersController.getUser);

export default router;
