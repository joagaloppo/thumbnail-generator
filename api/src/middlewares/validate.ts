import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import ApiError from '../utils/ApiError';
import pick from '../utils/pick';

const validate = (schema: Record<string, z.ZodSchema<any>>) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']) as Record<string, z.ZodSchema<any>>;

  const reqData = { params: req.params, query: req.query, body: req.body };
  const object = pick(reqData, Object.keys(validSchema)) as Record<string, unknown>;

  const hasError = Object.keys(validSchema).some((key) => {
    try {
      validSchema[key].parse(object[key]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(', ');
        next(new ApiError(400, errorMessage));
        return true;
      }
      next(error);
      return true;
    }
    return false;
  });

  if (!hasError) {
    Object.assign(req, object);
    next();
  }
};

export default validate;
