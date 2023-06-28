import path from 'path';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') cb(null, true);
    else cb(new Error('Only images in JPG, JPEG or PNG format are allowed.'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');

export default upload;
