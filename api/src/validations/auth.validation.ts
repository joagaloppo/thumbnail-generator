import { z } from 'zod';

const email = z
  .string()
  .email()
  .max(128)
  .transform((str) => str.toLowerCase().trim());
const userId = z.string().min(3).max(32);
const password = z.string().min(6).max(128);

const register = { body: z.object({ email, userId, password }) };
const login = { body: z.object({ userId, password }) };

const authValidation = { register, login };
export default authValidation;
