import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import serverless from 'serverless-http';
import router from './routes';
import passport from './config/passport';
import morgan from './config/morgan';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import config from './config/config';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(passport.initialize());
app.use(router);

app.use((req, _, next) => next(new ApiError(404, `Cannot ${req.method} ${req.path}`)));
app.use(errorConverter);
app.use(errorHandler);

// eslint-disable-next-line
export const handler = serverless(app);
