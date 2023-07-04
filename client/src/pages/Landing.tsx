import { useState, lazy, Suspense } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import Spinner from '../components/Spinner';

const SignUp = lazy(() => import('../components/SignUp'));
const SignIn = lazy(() => import('../components/SignIn'));

interface LandingProps {
  children?: React.ReactNode;
}

const ModalFallback = () => {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <div className="fixed inset-0 z-10 bg-black/20" />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <div className="fixed left-1/2 top-[2vw] z-20 flex w-[96vw] max-w-md -translate-x-1/2 flex-col gap-4 rounded-lg bg-white p-6 sm:top-1/2 sm:-translate-y-1/2">
            <Spinner theme="dark" className="my-32 h-8 w-auto" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Landing: React.FC<LandingProps> = () => {
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <section className="flex min-h-[calc(100svh_-_60.8px)] w-full  items-center px-4">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-6">
        <span className="text-center text-4xl font-extrabold tracking-tighter text-gray-800 md:text-5xl">
          Image resizing made easy
        </span>

        <span className="text-md text-center text-gray-500 md:text-lg">
          Thumby is a free tool that helps you resize your images to the correct size.
        </span>

        <div className="flex gap-4">
          <div>
            <button
              className="rounded-full border border-gray-800 bg-gray-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
              onClick={() => (cookies.access_token ? navigate('upload') : setShowSignUp(true))}
            >
              Get Started
            </button>
            <Suspense fallback={<ModalFallback />}>
              {showSignUp && <SignUp open={showSignUp} setOpen={setShowSignUp} setSignIn={setShowSignIn} />}
            </Suspense>
          </div>
          <div>
            <button
              className="rounded-full border border-gray-800 px-5 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
              onClick={() => (cookies.access_token ? navigate('upload') : setShowSignIn(true))}
            >
              Sign In
            </button>
            <Suspense fallback={<ModalFallback />}>
              {showSignIn && <SignIn open={showSignIn} setOpen={setShowSignIn} setSignUp={setShowSignUp} />}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
