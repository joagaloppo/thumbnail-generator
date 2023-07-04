import { useCookies } from 'react-cookie';
import Logo from '../assets/logo.png';

interface NavProps {
  children?: React.ReactNode;
}

const Auth: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const handleLogout = () => {
    removeCookie('access_token');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLogout()}
        className="cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
      >
        {cookies.access_token ? 'Logout' : 'Sign In'}
      </button>
    </div>
  );
};

const Nav: React.FC<NavProps> = () => {
  return (
    <nav className="fixed z-10 w-full border-b bg-white/95 py-4 backdrop-blur-sm">
      <div className=" mx-auto flex w-full max-w-screen-md items-center justify-between px-4">
        <div className="pointer-events-none flex items-center gap-1">
          <img src={Logo} alt="Thumby Logo" className="h-6 w-auto rounded-full" />
          <h1 className="text-xl font-bold tracking-tight text-gray-800">thumby</h1>
        </div>
        <Auth />
      </div>
    </nav>
  );
};

export default Nav;
