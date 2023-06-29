interface LandingProps {
  children?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = () => {
  return (
    <section className="min-h-[calc(100svh_-_144px)] px-4 lg:min-h-[calc(100svh_-_168px)]">
      <div className="flex w-full items-center justify-center">Landing</div>
    </section>
  );
};

export default Landing;
