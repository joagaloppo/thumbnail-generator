import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import config from '../config/config';
import catchAsync from '../utils/catchAsync';

const register = catchAsync(async (req: Request, res: Response) => {
  const { userId, email, password } = req.body;

  // Check if email already exists
  const getParams = { TableName: config.usersTable, Key: { userId } };
  const { Item } = await db.get(getParams).promise();
  if (Item) return res.status(400).json({ message: 'A user with this email already exists' });

  // Create user in the database
  const hash = bcrypt.hashSync(password, 8);
  const params = { TableName: config.usersTable, Item: { userId, email, password: hash } };
  await db.put(params).promise();

  // Create token after registering the user
  const payload = { sub: userId, iat: Date.now() };
  const token = jwt.sign(payload, config.jwtSecret);

  return res.status(201).json({ token, user: { userId, email } });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  // Check if user exists
  const params = { TableName: config.usersTable, Key: { userId } };
  const { Item } = await db.get(params).promise();
  if (!Item) return res.status(400).json({ message: 'Invalid email or password' });

  // Check if password is correct
  const passwordMatch = bcrypt.compareSync(password, Item?.password);
  if (!passwordMatch) throw new Error('Invalid email or password');

  // Create token and return it
  const payload = { sub: Item?.userId, iat: Date.now() };
  const token = jwt.sign(payload, config.jwtSecret);
  return res.status(200).json({ token, user: { userId: Item?.userId, email: Item?.email } });
});

export default { register, login };
