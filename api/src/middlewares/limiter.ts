import rateLimit from 'express-rate-limit';
import ApiError from '../utils/ApiError';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler(req, res, next) {
    next(new ApiError(429, 'You have exceeded the 5 requests in 15 minutes limit!'));
  },
});

export default limiter;
