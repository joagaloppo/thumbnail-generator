import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import utils from '../utils/image';

const sizes = [
  { name: 'small', w: 200, h: 100 },
  { name: 'medium', w: 300, h: 200 },
  { name: 'large', w: 400, h: 300 },
];

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  utils.process(req, res, async (err) => {
    if (err) throw new ApiError(400, err.message);
    if (!req.file) throw new ApiError(400, 'No image provided');

    const name = Math.random().toString(36).substring(2, 10);
    const { buffer, mimetype } = req.file as Express.Multer.File;
    const files = await Promise.all(sizes.map((size) => utils.resize(buffer, size.w, size.h)));
    const urls = await Promise.all(files.map((e, i) => utils.upload(e, `${name}-${sizes[i].name}`, mimetype)));

    return res.status(200).json({
      images: { small: urls[0].Location, medium: urls[1].Location, large: urls[2].Location },
    });
  });
});

const imageController = { uploadImage };
export default imageController;
