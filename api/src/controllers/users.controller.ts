import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config/config';
import db from '../config/database';

const { usersTable } = config;

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const params = { TableName: usersTable };

  db.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: 'Could not get users' });
    }
    if (result.Items) return res.json(result.Items);

    return res.status(404).json({ error: 'No users found' });
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const params = {
    TableName: usersTable,
    Key: {
      userId: req.params.userId,
    },
  };

  db.get(params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      return res.json({ userId, name });
    }
    return res.status(404).json({ error: 'User not found' });
  });
});

const usersController = { getUsers, getUser };
export default usersController;
