import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import config from "../config/config";
import db from "../config/database";

const { usersTable } = config;

const register = catchAsync(async (req: Request, res: Response) => {
  const { userId, name } = req.body;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    return res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: usersTable,
    Item: { userId, name },
  };

  db.put(params, (error) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Could not create user" });
    }
    return res.json({ userId, name });
  });
});

const authController = { register };
export default authController;
