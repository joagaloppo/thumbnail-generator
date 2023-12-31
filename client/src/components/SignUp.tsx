import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Spinner from './Spinner';

interface SignUpProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ open, setOpen, setSignIn }) => {
  const [cookies, setCookie] = useCookies(['access_token']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        userId: username,
        email,
        password,
      });
      setCookie('access_token', res.data.token);
      setOpen(false);
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setError('');
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {open && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay asChild forceMount>
            <div className="fixed inset-0 z-10 bg-black/20" />
          </Dialog.Overlay>
          <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
            <div className="fixed left-1/2 top-[2vw] z-20 flex w-[96vw] max-w-md -translate-x-1/2 flex-col gap-4 rounded-lg bg-white p-6 sm:top-1/2 sm:-translate-y-1/2">
              <button
                type="button"
                className="absolute right-4 top-4 bg-transparent p-1.5 text-slate-400 hover:text-slate-700"
                onClick={handleOpenChange}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="pb-1 pt-2">
                <h3 className="text-center text-xl font-semibold tracking-tight text-slate-700 ">Create account</h3>
                <p className="text-center text-sm text-slate-500">Sign up to get access to the platform.</p>
              </div>
              {error && (
                <div className="rounded-sm border border-red-800/10 bg-red-50 p-2 text-sm text-red-800/70">
                  <p>{error}</p>
                </div>
              )}

              <form className="space-y-4 focus:outline-none" onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  disabled={loading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border bg-gray-50 p-2.5 text-sm text-slate-900 focus:outline-none"
                  placeholder="username"
                  required
                />
                <input
                  type="email"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border bg-gray-50 p-2.5 text-sm text-slate-900 focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
                <input
                  type="password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-md border bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
                  required
                />
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" required />
                  <label htmlFor="remember" className="text-sm text-slate-500">
                    I agree to the terms and privacy.
                  </label>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full rounded-full bg-primary py-2.5 text-center text-sm font-medium text-white hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex w-full items-center justify-center gap-2 text-center">
                        <span>Register</span>
                        <Spinner className="w-4" theme="light" />
                      </div>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                  <div className="flex justify-center pb-2">
                    <p className="text-sm text-slate-500">
                      Already have an account?{' '}
                      <button
                        onClick={() => {
                          handleOpenChange();
                          setSignIn(true);
                        }}
                        className="text-primary underline-offset-2 hover:underline "
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};

export default SignUp;
