import express, { Request, Response } from "express";
import serverless from "serverless-http";

const app = express();
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/", router);

export const handler = serverless(app);
