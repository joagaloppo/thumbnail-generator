interface UploadProps {
  children?: React.ReactNode;
}

const Upload: React.FC<UploadProps> = () => {
  return (
    <section className="min-h-[calc(100svh_-_144px)] px-4 lg:min-h-[calc(100svh_-_168px)]">
      <div className="flex w-full items-center justify-center">Upload</div>
    </section>
  );
};

export default Upload;
