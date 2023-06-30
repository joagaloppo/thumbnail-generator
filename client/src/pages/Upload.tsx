import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import clsx from 'clsx';
import DropZone from '../components/DropZone';
import Spinner from '../components/Spinner';

interface UploadProps {
  children?: React.ReactNode;
}

const sizes = [
  {
    width: 175,
    height: 87.5,
  },
  {
    width: 225,
    height: 150,
  },
  {
    width: 275,
    height: 206.25,
  },
];

const Upload: React.FC<UploadProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    try {
      Cookies.get('access_token');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });
      console.log(response.data.images);
      const urlSmall = response.data.images.small;
      const urlMedium = response.data.images.medium;
      const urlLarge = response.data.images.large;
      setUrls([urlSmall, urlMedium, urlLarge]);
      setFile(null);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100svh_-_148px)] px-4 py-8 lg:min-h-[calc(100svh_-_164px)]">
      <DropZone setFile={setFile} />
      {file && (
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-1 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500 ">{file.name}</p>
            <p className="text-xs text-gray-500 ">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="mt-2 rounded-full bg-primary px-4 py-1.5 font-semibold text-white hover:bg-blue-600 focus:outline-none
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Upload</span>
                <Spinner className="w-4" theme="light" />
              </div>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      )}

      {loading && (
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-12 py-12">
          {sizes.map((size, index) => (
            <div key={index} className="flex w-full flex-col items-center justify-between gap-8 sm:flex-row">
              <img className="animate-pulse bg-gray-200" width={size.width} height={size.height} />
              <Spinner className="h-6" theme="dark" />
            </div>
          ))}
        </div>
      )}

      {urls.length > 0 && (
        <div className={clsx('mx-auto flex max-w-2xl flex-col items-start gap-12 py-12', loading && 'hidden')}>
          {urls.map((url, index) => (
            <div key={index} className="mx-auto flex w-full flex-col items-center gap-4 sm:mx-0 sm:flex-row">
              <img
                src={url}
                alt="resized"
                width={sizes[index].width}
                className={clsx('transition duration-300 hover:opacity-50', loading && 'hidden')}
                onLoad={() => setLoading(false)}
              />
              <div className="flex w-full flex-col items-center gap-2 sm:items-end">
                <a
                  href={url}
                  className="text-center text-sm text-primary underline-offset-2 hover:underline sm:text-right"
                >
                  {url}
                </a>
                <div className="flex justify-center gap-2 sm:justify-start">
                  <button className="mt-2 rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary transition hover:bg-blue-50 focus:outline-none">
                    Copy
                  </button>
                  <button className="mt-2 rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary transition hover:bg-blue-50 focus:outline-none">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Upload;
