import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  IS_OFFLINE: z.string().default('false'),
  USERS_TABLE: z.string(),
  BUCKET_NAME: z.string(),
  JWT_SECRET: z.string(),
});

const envVars = envVarsSchema.parse(process.env);

const config = {
  env: envVars.NODE_ENV,
  isOffline: envVars.IS_OFFLINE,
  usersTable: envVars.USERS_TABLE,
  bucketName: envVars.BUCKET_NAME,
  jwtSecret: envVars.JWT_SECRET,
};

export default config;
