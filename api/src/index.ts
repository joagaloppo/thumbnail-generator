import express from 'express';
import serverless from 'serverless-http';
import passport from './config/passport';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/', router);

// eslint-disable-next-line
export const handler = serverless(app);
