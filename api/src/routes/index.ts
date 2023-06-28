import express, { Request, Response } from 'express';
import authRouter from './auth.route';
import usersRouter from './users.route';
import imagesRouter from './images.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);

router.get('/', (req: Request, res: Response) => res.json({ message: 'Hello World!' }));
router.get('/is-offline', (req, res) => res.json({ message: `Is offline: ${process.env.IS_OFFLINE}` }));

export default router;
