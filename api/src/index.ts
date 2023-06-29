import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import serverless from 'serverless-http';
import passport from './config/passport';
import morgan from './config/morgan';
import router from './routes';
import { errorConverter, errorHandler } from './middlewares/error';
import limiter from './middlewares/limiter';
import ApiError from './utils/ApiError';

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use('/images', limiter);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(passport.initialize());
app.use(router);

app.use((req, _, next) => next(new ApiError(404, `Cannot ${req.method} ${req.path}`)));
app.use(errorConverter);
app.use(errorHandler);

// eslint-disable-next-line
export const handler = serverless(app);
