import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface DropZoneProps {
  children?: React.ReactNode;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadSVG: React.FC = () => {
  return (
    <svg
      className="mb-3 h-10 w-10 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      ></path>
    </svg>
  );
};

const DropZone: React.FC<DropZoneProps> = ({ setFile }) => {
  const [dragging, setDragging] = useState(false);
  const dropRef = useRef<HTMLLabelElement>(null);
  let dragCounter = 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragIn = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter += 1;
    if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter -= 1;
    if (dragCounter === 0) {
      setDragging(false);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer?.files && event.dataTransfer?.files.length > 0) {
      setFile(event.dataTransfer?.files[0]);
      event.dataTransfer?.clearData();
      dragCounter = 0;
    }
  };

  useEffect(() => {
    const div = dropRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
    }
    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragIn);
        div.removeEventListener('dragleave', handleDragOut);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  return (
    <>
      <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
        <label
          className={clsx(
            ' flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100',
            dragging && 'border-primary-300 bg-primary-100 text-primary hover:bg-blue-100'
          )}
          ref={dropRef}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <UploadSVG />
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG or JPG (MAX. 5 MB)</p>
          </div>
          <input className="hidden" type="file" onChange={handleChange} />
        </label>
      </div>
    </>
  );
};

export default DropZone;
