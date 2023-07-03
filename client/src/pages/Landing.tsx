import { useState, lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Industry from '../assets/industry.png';

const SignUp = lazy(() => import('../components/SignUp'));
const SignIn = lazy(() => import('../components/SignIn'));

interface LandingProps {
  children?: React.ReactNode;
}

const ModalFallback = () => {
  return (
    <>
      <div className="fixed inset-0 z-10 bg-black/20" />
      <div className="fixed left-1/2 top-[2vw] z-20 flex w-[96vw] max-w-md -translate-x-1/2 flex-col gap-4 rounded-lg bg-white p-6 sm:top-1/2 sm:-translate-y-1/2">
        <Spinner theme="dark" className="my-32 h-8 w-auto" />
      </div>
    </>
  );
};

const Landing: React.FC<LandingProps> = () => {
  const user = Cookies.get('access_token');
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <section className="min-h-[calc(100svh_-_148px)] px-4 py-20 lg:min-h-[calc(100svh_-_164px)]">
      <section className="mx-auto flex max-w-screen-lg flex-col items-center">
        <h1 className="mb-4 max-w-2xl text-center text-3xl font-extrabold leading-none tracking-tight  md:text-4xl xl:text-5xl">
          Thumbnail Generator
        </h1>
        <p className="mb-6 max-w-lg text-center font-light text-gray-500  md:text-lg lg:mb-8 lg:text-xl">
          Get your thumbnails generated in a few clicks, we resize your images to the correct size.
        </p>
        <div className="flex gap-2">
          <div>
            <button
              className="text-md rounded-full border border-primary bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary-600"
              onClick={() => (user ? navigate('upload') : setShowSignUp(true))}
            >
              Get Started
            </button>
            <Suspense fallback={<ModalFallback />}>
              {showSignUp && <SignUp open={showSignUp} setOpen={setShowSignUp} setSignIn={setShowSignIn} />}
            </Suspense>
          </div>
          <div>
            <button
              className="text-md rounded-full border border-primary px-5 py-2.5 font-medium text-primary transition hover:bg-primary-50"
              onClick={() => (user ? navigate('upload') : setShowSignIn(true))}
            >
              Sign In
            </button>
            <Suspense fallback={<ModalFallback />}>
              {showSignIn && <SignIn open={showSignIn} setOpen={setShowSignIn} setSignUp={setShowSignUp} />}
            </Suspense>
          </div>
        </div>
        <img src={Industry} alt="industry" className="mt-16 h-auto w-full max-w-[600px] rounded-xl" />
      </section>
    </section>
  );
};

export default Landing;
