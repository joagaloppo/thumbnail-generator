import express from 'express';
import serverless from 'serverless-http';
import router from './routes';

const app = express();

app.use('/', router);

export const handler = serverless(app);
