import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config/config';
import db from '../config/database';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const params = { TableName: config.usersTable };

  db.scan(params, (error, result) => {
    if (error) return res.status(400).json({ error: 'Could not get users' });
    if (result.Items) return res.json(result.Items);
    return res.status(404).json({ error: 'No users found' });
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const params = { TableName: config.usersTable, Key: { userId: req.params.userId } };

  db.get(params, (error, result) => {
    if (error) return res.status(400).json({ error: 'Could not get user' });
    if (result.Item) {
      const { userId, email } = result.Item;
      return res.json({ userId, email });
    }
    return res.status(404).json({ error: 'User not found' });
  });
});

const usersController = { getUsers, getUser };
export default usersController;
