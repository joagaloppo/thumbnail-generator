import Icon from '@mui/icons-material/CloudUpload';

interface NavProps {
  children?: React.ReactNode;
}

const Nav: React.FC<NavProps> = () => {
  return (
    <nav className="w-full bg-primary px-4 py-5 lg:py-6">
      <div className="mx-auto flex h-full max-h-[70px] w-full max-w-screen-lg items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="text-white" />
          <h1 className="pointer-events-none text-xl font-semibold tracking-tight text-white">thumby</h1>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
