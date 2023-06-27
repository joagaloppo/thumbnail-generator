import express, { Request, Response } from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";

import router from "./routes";

const app = express();
app.use(bodyParser.json({ strict: false }));
app.use("/", router);

export const handler = serverless(app);
