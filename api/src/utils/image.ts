import path from 'path';
import multer from 'multer';
import Jimp from 'jimp';
import config from '../config/config';
import s3 from '../config/bucket';

const storage = multer.memoryStorage();

const process = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') cb(null, true);
    else cb(new Error('Only images in JPG, JPEG or PNG format are allowed.'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');

const resize = async (buffer: Buffer, width: number, height: number) => {
  const image = await Jimp.read(buffer);
  image.cover(width, height);
  return image.getBufferAsync(Jimp.MIME_PNG);
};

const upload = (body: Buffer, fileName: string, mimeType: string) => {
  const params = {
    Body: body,
    Key: fileName,
    ACL: 'public-read',
    ContentType: mimeType,
    Bucket: config.bucketName,
  };
  return s3.upload(params).promise();
};

export default { process, resize, upload };
